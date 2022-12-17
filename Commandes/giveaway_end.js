const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { time } = require('@discordjs/builders')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")
const ms = require('ms')
const config = require('../config')
const msg = require('../autres/giveawaymessage')

module.exports = {
    name: "giveaway_end",
    description: "terminer un giveaway",
    utilisation: "/giveaway_end [ID]",
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

        const query = args.getString('id');

        const giveaway = bot.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) || bot.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);

        if (!giveaway) {
            return message.reply({
                content: 'Je ne trouve pas le giveaway `'+ query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return message.reply({
                content: 'Ce giveaway est déjà fini',
                ephemeral: true
            });
        }

        bot.giveawaysManager.end(giveaway.messageId)
       
        .then(() => {
            
            message.reply('Giveaway ended!');
        })
        .catch((e) => {
            message.reply({
                content: e,
                ephemeral: true
            });
        });

}
}
