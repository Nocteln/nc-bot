const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "set_xp",
    description: "Définie l'xp du serveur",
    utilisation: "/set_xp [état] (salon)",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Modération",
    options: [
        {
            type: 'string',
            name: "état",
            description: "active l'xp sur le serveur",
            required: true,
            autocomplete: true,
        },
        {
            type: 'channel',
            name: 'salon',
            description: "Le salon dans lequel vous shouaitez envoyer les messages de niveaux !",
            required: false,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {
        
        let etat = args.getString("état") 
        let channel = args.getChannel('salon')
        if(etat !== "on" && etat !== "off") return message.reply({ embeds: [embedr("Red", "❌ erreur", "Vous devez indiquer on ou off")]})
        
        if (etat === "off") {                   
            db.query(`UPDATE server SET xp = 'false' WHERE guild = '${message.guildId}'`)
            message.reply({embeds: [embedr("Green", ":white_check_mark: succes", "l'xp à bien été désactivé pour ce serveur")]})
        } else { if(!channel) {
            db.query(`UPDATE server SET xp = 'true' WHERE guild = '${message.guildId}'`)
            message.reply({embeds: [embedr("Green", ":white_check_mark: succes", `l'xp à bien été activée pour ce serveur et les messages de niveaux s'enveront dans le salon du passage de niveau`)]})
        } else {
            db.query(`UPDATE server SET xp = '${channel.id}' WHERE guild = '${message.guildId}'`)
            message.reply({embeds: [embedr("Green", ":white_check_mark: succes", `l'xp à bien été activée pour ce serveur et les messages de niveaux s'enveront dans le salon ${channel}`)]})
        }} 
    }
}
