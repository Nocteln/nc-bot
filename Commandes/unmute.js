const Discord = require("discord.js")
const ms = require("ms")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'unmute',
    description: 'unmute un membre',
    utilisation: "/unmute [utilisateur] (raison)",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a unmute",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison du unmute",
            required: false,
            autocomplete: false,
        }
    ],
    

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas la personne à dé-muter !")]})
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas la personne à dé-muter !")]})

        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournie"

        
        if(!member.moderatable) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne peut pas dé-muter ce membre!")]})
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers)) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous n'avez pas la permition de faire ceci !")]})
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous n'avez pas la permition de faire ceci !")]})
        if(!member.isCommunicationDisabled()) return message.reply({embeds: [embedr("Red", "❌ erreur","Ce membre n'est pas muet !")]})

        await member.timeout(null, reason)

        try {await user.send(`Tu as été unmute du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

        await message.reply({embeds: [embedr("#55eb34",":white_check_mark: succes",`${message.user} à unmute \`${user.tag}\` pour la raison : \`${reason}\``)]})

        
    }
}

