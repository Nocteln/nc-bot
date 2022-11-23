const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
module.exports = {
    name: "kick",
    description: "Exclure un membre du serveur",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a exclure",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison de l'exclusion",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {



        let user = args.getUser("membre")
        if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas la personne à exclure !")]})
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas la personne à exclure !")]})

        let reason = args.getString("raison");
        if(!reason) reason = "Aucune raison n'a été fournie !";
        if(message.user.id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas vous exclure vous même !")]})

        if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [embedr("#FF0000", "❌ erreur","Vous ne pouvez pas exclure le créateur du serveur !")]})

        if(member && !member.kickable) return message.reply({embeds: [embedr("#FF0000", "❌ erreur","Je ne peux pas exclure ce membre !")]})
       
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return message.reply({embeds: [embedr("❌ erreur","Vous n'avez pas la permition d'exclure les membres !")]})

        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [embedr("❌ erreur","Vous ne pouvez pas exclure ce membre !")]})
            


        try {await user.send(`Tu as été exclut du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

        await message.reply({embeds: [embedr("#55eb34",":white_check_mark: succes",`${message.user} à exclut ${user.tag} pour la raison : \`${reason}\``)]})

        await member.kick(reason)


    }
}