const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "unban",
    description: "débannir un membre",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a débannir",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison du débannir",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas la personne à débannir !")]})
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison a été fournie !";
            if(message.user.id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas vous débannir vous même !")]})

            if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas débannir le créateur du serveur !")]})

            if(member && !member.bannable) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne peux pas débannir ce membre !")]})

            if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous n'avez pas les permissions de débannir !")]})

            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas débannir ce membre !")]})

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply({embeds: [embedr("Red", "❌ erreur","Ce membre n'est pas banni !")]})

            try {await user.send(`Tu as été débanni du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

            await message.reply({embeds: [embedr("Green", ":white_check_mark: Succes",`${message.user} à débanni \`${user.tag}\` pour la raison : \`${reason}\``)]})

            await message.guild.members.unban(user.id, {reason: reason})

        } catch (err) {
            console.log(err)
            return message.reply("erreur")
            
        }

    }
}