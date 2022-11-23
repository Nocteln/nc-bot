const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "warn",
    description: "avertir un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a avertir",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison de l'avertissement",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membres !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie !"

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous avertir vous même !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas avertir le créateur du serveur !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas avertir ce membre !")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le bot ne peux pas avertir ce membre !")
        
        try { await user.send(`\`${message.user.tag}\` vous à avertir sur le serveur \`${message.guild.name}\` pour la raison \`${reason}\``)} catch (err) {}

        let ID  = await bot.function.createId("WARN")

        await message.reply(`vous avez averti \`${user.tag}\` pour la raison : \`${reason}\` sous l'ID : \`${ID}\`avec succès !`)

        

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}