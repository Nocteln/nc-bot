const Client = require('clash-royale-api')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const config = require('../config')
const client = new Client(config.crtoken)

module.exports = {
    name: "clashroyale",
    description: "Permet de voir les informations du joueur",
    permission: "Aucune",
    dm: false,
    category: "Fun",
    options: [
      {
        type: "string",
        name: "tag",
        description: "Tag du joueur",
        required: true,
        autocomplete: false
      }
    ],

    async run(bot, message, args) {
        (async function () {

            let tag = args.getString("tag")
      
            try {
              const data = await client.player(tag)
              const malEmbed = new Discord.EmbedBuilder()
                .setTitle("***Clash Royale***")
                .setColor("#00A705")
                .setDescription(`
      
                     ${logoclashofclan} **Les informations du joueur :**
      
                            > **Nom :** \`${data.name}\`
                            > **Arène :** \`${data.arena}\`
                            > **Level :** \`${data.expLevel}\`
                            > **Trophée :** \`${data.trophies}\`
                            > **Meilleur nombre de trophée :** \`${data.bestTrophies}\`
      
                            `)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
      
              message.reply({ embeds: [malEmbed] })
        } catch (err) { 
            console.log(err)
            message.reply({embeds: [embedr("Red", ":x: erreur", "Tag invalide")]}) }
          })()
      
    }

    
}