const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "set_antiraid",
    description: "paramétrer l'antiraid sur le serveur",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "string",
            name: "état",
            description: "état de l'antiraid (on/off)",
            required: true,
            autocomplete: true
        },
    ],

    async run(bot, message, args, db) {
        let etat = args.getString("état")

        if(etat !== "on" && etat !== "off") return message.reply({ embeds: [embedr("Red", "❌ erreur", "Vous devez indiquer on ou off")]})

        if(etat === "off") {

            db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", "L'antiraid à bien été désactivé ! Les membres ne peuvent désormais plus rejoindre le serveur")]})
        } else {
            db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)
            await message.reply({ embeds: [embedr("Green", ":white_check_mark: succes ", `L'antiraid à bien été activé !`)]})
        }
    }
}