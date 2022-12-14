const { PermissionFlagsBits, MessageFlags } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "unwarn",
    description: "enlever l'avertissement d'un membre",
    utilisation: "/unwarn [utilisateur] [id] (raison)",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: 'user',
            name: "membre",
            description: "le membre dont vous voulez enlever l'avertissement",
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: "id",
            description: "le ID du warn à retirer",
            required: true,
            autocomplete: false            
        }, {
            type: 'string',
            name: "raison",
            description: "la raison de l'unwarn",
            required: false,
            autocomplete: false            
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membres !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")
        let IDs = args.getString("id")
        if(!IDs) return message.reply("pas d'ID")
        await message.deferReply()

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie !"

        if(message.user.id === user.id) return message.editReply({embeds: [embedr("Red", ":x: error", "Vous ne pouvez pas vous unwarn vous même !")]})
        if((await message.guild.fetchOwner()).id === user.id) return message.editReply({embeds: [embedr('Red', ":x: erreur","Vous ne pouvez pas unwarn le créateur du serveur !")]})
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.editReply({embeds: [embedr("Red",":x: erreur", "Vous ne pouvez pas unwarn ce membre !")]})
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.editReply({embeds: [embedr("Red",":x: erreur", "Le bot ne peux pas unwarn ce membre !")]})
        
        try { await user.send(`\`${message.user.tag}\` vous à unwarn sur le serveur \`${message.guild.name}\` pour la raison \`${reason}\``)} catch (err) {}

        await message.editReply({embeds: [embedr("Green", ":white_check_mark: success",`vous avez unwarn \`${user.tag}\` pour la raison : \`${reason}\` avec succès !`)]})

        db.query(`DELETE FROM warns WHERE warns.warn = '${IDs}'`)
    }
}