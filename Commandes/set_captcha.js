const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "set_captcha",
    description: "paramétrer le captcha sur le serveur",
    utilisation: "/set_captcha [utilisateur]",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "string",
            name: "état",
            description: "état du captcha (on/off)",
            required: true,
            autocomplete: true
        },
        {
            type: "channel",
            name: "salon",
            description: "salon du captcha",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        let etat = args.getString("état")

        if(etat !== "on" && etat !== "off") return message.reply({ embeds: [embedr("Red", "❌ erreur", "Vous devez indiquer on ou off")]})

        if(etat === "off") {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", "Le captcha à bien été désactivé !")]})
        } else {
            let channel = args.getChannel('salon')
            if(!channel) return message.reply({ embeds: [embedr("Red", "❌ erreur", "Vous devez indiquer le salon où mettre le captcha !")]})
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply({ embeds: [embedr("Red", "❌ erreur", "Le salon indiqué nest pas correct !")]})

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
            await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", `Le captcha à bien été activé sur le salon ${channel} !`)]})
        }
    }
}