const { EmbedBuilder } = require("discord.js");

module.exports.embedr = (color, title, text) => {
   const embed = new EmbedBuilder()
   .setFooter({text: "normalcochon-bot", iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.webp?size=512"})
    .setColor(color)
    .setTitle(title)
    .setDescription(text)
    .setTimestamp()
   return embed;
};