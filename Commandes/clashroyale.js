const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const config = require('../config')
const { ClashRoyaleAPI } = require('@varandas/clash-royale-api')
const api = new ClashRoyaleAPI(config.crtoken)   

module.exports = {
    name: "clashroyale",
    description: "Permet de voir les informations du joueur",
    permission: "Aucune",
    utilisation: "/clashroyale [tag]",
    dm: false,
    category: "fun",
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
 
 
 
      let tag = args.getString("tag")
   
      try {
        api.getPlayerByTag(tag)
          .then((data) => {
   
            const malEmbed = new Discord.EmbedBuilder()
              .setTitle("***Clash royal***")
              .setColor("#00A705")
              .setDescription(`
   
               **Les informations du joueur :**
   
                      > **Name :** \`${data.name}\`
                      > **Arène :** \`${data.arena.name}\`
                      > **Level :** \`${data.expLevel}\`
                      > **Combat gagné :** \`${data.wins}\`
                      > **Combat perdus :** \`${data.losses}\`
                      > **Nombre de combat :** \`${data.battleCount}\`
                      > **Trophée :** \`${data.trophies}\`
                      > **Meilleur nombre de trophée :** \`${data.bestTrophies}\`
                      > **Total de donations :** \`${data.totalDonations}\``)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
              .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
   
            message.reply({ embeds: [malEmbed] })
   
          })
      } catch (err) { message.reply("Mettre le tag du joueur") }
    }
      
}