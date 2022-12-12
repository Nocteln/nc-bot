const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
module.exports = {
    name: 'test',
    description: 'affiche hello world',
    utilisation: "/test",
    permission: 'Aucune',
    category: "utilitaire",
    dm: true,


    async run(bot, message) {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
            )
        bot.on("interactionCreate", async (interaction) => {
            if (interaction.customId === "primary") {
                interaction.reply("Ok")
            }
        })
        await message.reply({ embeds: [embedr("Random", " ", "HeLL0 WoRlD")], components: [row] })
    }
}