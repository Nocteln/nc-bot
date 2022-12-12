const Discord = require("discord.js")
const ms = require("ms")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'mute',
    description: 'Permet de rendre muet un membre',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    utilisation: "/mute [utilisateur] [temps] (raison)",
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a mute",
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: "temps",
            description: "le temps du mute",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "raison",
            description: "la raison du mute",
            required: false,
            autocomplete: false,
        }
    ],
    

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas de personne à mute !")]})
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas de personne à mute !")]})

        let time = args.getString("temps")
        if(!time) return message.reply({embeds: [embedr("Red", "❌ erreur","veuillez indiquer le temps du mute")]})
        if(isNaN(ms(time))) return message.reply({embeds: [embedr("Red", "❌ erreur","Pas le bon format de temps (1d, 1m, 1h)")]})
        if(ms(time) > 2419200000) return message.reply({embeds: [embedr("Red", "❌ erreur",`le mute ne peut pas durer plus de 28 jours`)]})

        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournie"

        if(message.user.id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Ne vous mutez pas vous mêmes")]})
        if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas rendre muet le créateur du serveur !")]})
        if(!member.moderatable) return message.reply("je ne peut pas mute ce membre")
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers)) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous n'avez pas les permissions !")]})
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas mute ce membre !")]})
        if(member.isCommunicationDisabled()) return message.reply("ce membre est déja mute")

        try {await user.send(`Tu as été mute du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pendant \`${time}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

        await message.reply({embeds: [embedr("Green", ":white_check_mark: succes",`${message.user} à mute \`${user.tag}\` pendant \`${time}\` pour la raison : \`${reason}\``)]})

        await member.timeout(ms(time), reason)
    }
}

