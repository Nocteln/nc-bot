const Discord = require("discord.js");
const config = require("../config")
const { Client } = require("clashofclans.js"); 
const { embedr } = require("../fonctions/embed")
const client = new Client({ keys: [config.coctoken] })
 
 
module.exports = {
 
  name: "clashofclans",
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
            .setTitle("***Clash of clan***")
            .setColor("#00A705")
            .setDescription(`
  
                 ${logoclashofclan} **Les informations du joueur :**
  
                        > **Name :** \`${data.name}\`
                        > **HDV :** \`${data.townHallLevel}\`
                        > **Level :** \`${data.expLevel}\`
                        > **Trophée :** \`${data.trophies}\`
                        > **Meilleur nombre de trophée :** \`${data.bestTrophies}\`
  
               ${logoclan}   **Les informations du clan :**
  
                        > **Name :** \`${data.clan.name}\`
                        > **Level du clan :** \`${data.clan.clanLevel}\`
                        > **Rôle du membre dans le clan :** \`${data.role}\`
                        
                        ${logoclashofclan}   **La ligue de joueurs :** 
  
                  > **league :** \`${data.league.name}\`
  
                        `)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
  
          message.reply({ embeds: [malEmbed] })
    } catch (err) { message.reply({embeds: [embedr("Red", ":x: erreur", "Tag invalide")]}) }
      })()
  
  }
}