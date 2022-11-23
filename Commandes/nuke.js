const Discord = require("discord.js")

module.exports = {

    name: "nuke",
    description: "Recréer un salon.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [

        {
            type: "channel",
            name: "salon",
            description: "Quel est le salon",
            required: true,
            autocomplete: false
        }

    ],

    async run(bot, message, args) {

        try {

            const channel = message.options.getChannel("salon");

            channel.clone({ position: channel.position.rawPosition }).then(async ch => {
                ch.send({ content: `Le salon a bien été recréer.` }).then((msg) => {
                    setTimeout(() => msg.delete(), 10000)
                })
                await message.reply({ content: `J'ai bien recréer le salon ${ch}. Veuillez patienter pour la suppréssion du salon.` }).then((ch) => {
                    setTimeout(() => channel.delete(), 10000)
                })
            })

        } catch (err) {

            console.log("Une erreur dans le commande nuke", err)

        }
    }
}