const Discord = require('discord.js')

module.exports = async (bot, message) => {
    var db = bot.db

    if(message.author.bot || message.channel.type == Discord.ChannelType.DM) return
    
    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, all) => {

        if(all.length<1)  {
            db.query(`INSERT INTO server (guild, captcha, antiraid,antispam, xp,reactionrole) VALUES (${message.guild.id}, 'false','false', 'false', 'true','')`)
        }

        if(all[0].antispam === 'true' ) await bot.function.searchSpam(message)
        if(all[0].xp !== 'false') {
            let salon = all[0].xp
            if(salon !== 'true') salon = bot.channels.cache.get(all[0].xp)
            
            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`, async (err, req) => {
        
                if(req.length<1) {
                    db.query(`INSERT INTO xp (guild, user, xp, level) VALUE ('${message.guildId}', '${message.author.id}', '0', '0')`)
                } else {
                    let level = parseInt(req[0].level)
                    let xp = parseInt(req[0].xp)
        
                    if((level+1)*1000 <= xp) {
                        db.query(`UPDATE xp SET xp = '${xp - (level+1)*1000}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`)
                        db.query(`UPDATE xp SET level = '${level+1}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`)
                    
                        if(salon === 'true'){
                        await message.channel.send(`${message.author} est passé au niveau ${level+1} !`)
                        } else {
                            try {await salon.send(`${message.author} est passé au niveau ${level+1}`)} catch(err) {}
                        }
                    } else {
        
                        let xpToGive = Math.floor(Math.random()*100) + 1
        
                        db.query(`UPDATE xp SET xp = '${xp + xpToGive}' WHERE guild = '${message.guildId}' AND user = '${message.author.id}'`)
                    }
                }
            })

        } else return
    }
    )

    
}