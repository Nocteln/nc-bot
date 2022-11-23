const Discord = require('discord.js')

module.exports = async (bot, member) => {
 
    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {


        if(req.length<1 )return

        if(req[0].antiraid === 'true') {
            try {
                await member.user.send("Vous ne pouvez pas rejoindre ce serveur car il est en mode antiraid")} catch(err) {}
                await member.kick('antiraid actif')
            
        }

        if(req[0].captcha === 'false')  return

        let channel = member.guild.channels.cache.get(req[0].captcha)
        if(!channel) return

        await channel.permissionOverwrites.create(member.user, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true
        })

        let captcha = await bot.function.generateCaptcha()

        let msg = await channel.send({content: `${member}, veuillez completer le captcha afin de débloquer l'accès au reste du serveur.\n *vous avez 2min et si vous ne le réussisez pas vous serez exclu du serveur !*`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})]})

        try {
            let filter = m => m.author.id === member.user.id
            let response = (await channel.awaitMessages({filter, max: 1, time: 120000, errors: ["time"]})).first()

            if(response.content === captcha.text) {
                await msg.delete()
                await response.delete()
                const role = '1044007788029956137';
                try {member.roles.add(role);} catch(err) {}

            }else {
                msg.delete()
                await response.delete()
                try {await member.user.send("Vous avez raté le captcha, vous pouvez re-rejoindre le serveur pour réésayer !")} catch (err) {}
                await channel.permissionOverwrites.delete(member.user.id)
                await member.kick("captcha non réussit !")
            }
        } catch (err) {
            console.log(err)
            await msg.delete()
            try {await member.user.send("Vous avez été trop lents pour résoudre le captcha, vous pouvez re-rejoindre le serveur pour réésayer !")} catch (err) {}
            await channel.permissionOverwrites.delete(member.user.id)
            await member.kick("captcha non fait !")
        }

        
    })
}