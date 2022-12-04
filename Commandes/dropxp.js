const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "dropxp",
    description: "drop de l'xp dans le salon",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Expérience",
    options: [
        {
            type: 'number',
            name: 'quantité',
            description: "le nombre d'xp à drop",
            required: true,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {
        
        const xpg = args.getNumber('quantité')
        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Drop d'xp`)
        .setDescription(`soyez le premier à récupérer ${xpg}xp`)
        .setTimestamp() 
        .setFooter({text: "normalcochon-bot", iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.webp?size=512"})
    

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Clique ici pour récupérer l\'xp')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(false) ,
        
            )
            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('xp déjà récupérée')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true) ,
            )
        
        
        //await message.reply({embeds : [Embed], components: [row] })
        await message.reply("commande désactivée !")
}
        

}
