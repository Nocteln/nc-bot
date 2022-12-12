const Discord = require("discord.js")

module.exports = {

    name: "botinfo",
    description: "Permet d'avoir les informations sur le bot",
    utilisation: "/botinfo",
    dm: false,
    permission: "Aucune",
    category: "Informations",

    async run(bot, message, args) {
        
        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`🤖${bot.user.username}🤖`)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: `${bot.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})
        .setImage(bot.user.banner ? bot.user.banner : undefined)
        .setDescription(`**✉️ Information Général ✉️\n🤖Nom : \`${bot.user.username}\`\n🔢 Tag : \`${bot.user.discriminator}\`\n📇Identifiant : \`${bot.user.id}\`\n👑 Propriétaire : \`Nocteln\`\n\n📊 Informations Statistics 📊\nServeur(s) : \`${bot.guilds.cache.size.toLocaleString()}\`\nSalon(s) : \`${bot.channels.cache.size.toLocaleString()}\`\nMembres Total modérés :** \`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\``)
        await message.reply({embeds : [Embed]})

    }
}