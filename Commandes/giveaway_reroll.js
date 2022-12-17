const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { time } = require('@discordjs/builders')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")
const ms = require('ms')
const config = require('../config')
const msg = require('../autres/giveawaymessage')

module.exports = {
    name: "giveaway_reroll",
    description: "changer le gagnant d'un giveaway",
    utilisation: "/giveaway_reroll [ID]",
    permissions: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "utilitaire",
    options: [
        {
            type: 'string',
            name: "id",
            description: "L'id du giveaway",
            required: true,
            autocomplete: false,
        },
    
    ],

    async run(bot, message, args, db) {

        let id = args.getString("id")

    const giveaway = bot.giveawaysManager.giveaways.find((g) => g.prize === id && g.guildId === message.guild.id) || bot.giveawaysManager.giveaways.find((g) => g.messageId === id && g.guildId === message.guild.id);

    if (!giveaway) {
        return message.reply({
            content: 'Je ne trouve pas le giveaway `'+ id +'`.',
            ephemeral: true
        });
    }

    if (!giveaway.ended) {
        return message.reply({
            content: 'Le giveaway n\'est pas terminé!',
            ephemeral: true
        });
    }

    bot.giveawaysManager.reroll(giveaway.messageId)
    .then(() => {
        // Success message
        message.reply('Une nouvelle personne à bien été tiré!');
    })
    .catch((e) => {
        message.reply({
            content: e,
            ephemeral: true
        });
    });


}
}
