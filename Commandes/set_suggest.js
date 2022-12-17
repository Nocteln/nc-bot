const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "set_suggest",
    description: "paramétrer les suggestions sur le serveur",
    utilisation: "/set_suggest [état] (salon)",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "string",
            name: "état",
            description: "état du système de suggestion (on/off)",
            required: true,
            autocomplete: true
        },
        {
            type: "channel",
            name: "salon",
            description: "Le salon où envoyer les suggestions",
            required: false,
            autocomplete: false
        },
    ],

    async run(bot, message, args, db) {
        let etat = args.getString("état")
        let salon = args.getChannel("salon")

        if(etat !== "on" && etat !== "off") return message.reply({ embeds: [embedr("Red", "❌ erreur", "Vous devez indiquer on ou off")]})
        db.query(`SELECT * FROM server WHERE guild = ${message.guildId}`, async (err, req) => {
            const active = req[0].suggest

            if(etat === "on"){
                if(!salon) return message.reply({embeds:[embedr("Red", ":x: erreur", "Veuillez indiquer un salon")]})
                db.query(`UPDATE server SET suggest = '${salon.id}' WHERE guild = '${message.guildId}'`)
                await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", `Les suggestions ont bien été activé et s'enveront dans le salon ${salon}!`)]})
            } else {
                if(active === 'false') return message.reply({embeds: [embedr('Red', ':x: erreur', "La commande </suggest:1052307002832978050> est déjà désactivée !")]})
                db.query(`UPDATE server SET suggest = 'false' WHERE guild = '${message.guildId}'`)
                await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", "Les suggestions ont bien été désactivé !")]})
                
            }
        })
        
    }
}