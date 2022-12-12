const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "ticket",
    description: "Envoyer un embed pour les tickets",
    utilisation: "/ticket",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Modération",
    dm: false,
    options: [
    ],

    async run(bot, message, args, db) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Création d'un ticket")
        .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
        .setDescription("Ne pas abuser de la création de ticket !")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic:true})})


        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("créer un ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("<:plus:1044196321768263770>")
        )
        await message.channel.send({embeds: [Embed], components: [btn]})

    }
}