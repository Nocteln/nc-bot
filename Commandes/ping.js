const Discord = require("discord.js")
module.exports = {
    name: 'ping',
    description: 'affiche la latence',
    utilisation: "/ping",
    permission: 'Aucune',
    category: "utilitaire",
    dm: true,
    

    async run(bot, message, args) {

        const embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("📌 Ping du Bot :")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**\`${bot.ws.ping}\`**`)
        .setTimestamp()
        .setFooter({text: "ping du bot", iconURL: bot.user.displayAvatarURL({dynamic:true})})

        await message.reply({embeds: [embed]})
    }
}

