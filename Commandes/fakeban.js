const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "fakeban",
    description: "permet de bannir un membre pour de faux",
    utilisation: "/fakeban [utilisateur] (raison)",
    permission: 'Aucune',
    dm: false,
    category: "fun",
    options: [
        {
            type: 'user',
            name: "membre",
            description: "le membre a bannir",
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: "raison",
            description: "la raison du bannir ",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas de personne à bannir !")]})
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison a été fournie !";            
            await message.reply({embeds: [embedr("Green", ":white_check_mark: success",`tu as bien banni pour de faux \`${user.tag}\` pour la raison : \`${reason}\``)], ephemeral:true})
            await message.channel.send({embeds: [embedr("Green", ":white_check_mark: success",`${message.user} à ban \`${user.tag}\` pour la raison : \`${reason}\``)]})

        } catch (err) {
            console.log(err)
            return message.reply({embeds: [embedr("Red", "❌ erreur","veuillez réessayer !")]})
            
        }

    }
}