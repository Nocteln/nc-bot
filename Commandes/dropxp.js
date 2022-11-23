const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

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
        
        let nombre
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
        bot.on("interactionCreate", async (interaction) => {
            if (interaction.customId === "primary") {
                user = interaction.user
                const filter = i => i.customId === 'primary'
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });

                    collector.on('collect', async i => {
                        await i.update({ content: "", components: [row2] });
                    });
                
                    
                
                db.query(`SELECT * FROM xp WHERE guild = '${interaction.guildId}' AND user = '${user.id}'`, async (err,req) => {
            
                    const xp = parseInt(req[0].xp)
                    const level = parseInt(req[0].level)                             
                    const xpadd = xpg+xp
        
                    if(req.length <1 ) {
                        db.query(`INSERT INTO xp (guild, user, xp, level) VALUE ('${interaction.guildId}', '${user.id}', '${xpadd}', '0'`) 
                        return interaction.reply({embeds: [embedr("Green",":white_check_mark: Bien joué :tada:",`${user.tag} à récupéré le drop de ${nombre}xp, il maintenant level ${level} avec ${xpadd} xp`)]})
                    }
                    db.query(`UPDATE xp SET xp = ${xpadd} WHERE guild = '${interaction.guildId}' AND user = '${user.id}'`)
                    await interaction.reply({embeds: [embedr("Green",":tada: Bien joué :tada:",`${user.tag} à récupéré le drop de ${xpg}xp, il maintenant level ${level} avec ${xpadd} xp`)]})
                    
                    //await interaction.editReply({components: []})
                //row.components[0].setDisabled(true)     
                
            })
              
            }
        })
        
        await message.reply({embeds : [Embed], components: [row] })
        
}
        

}
