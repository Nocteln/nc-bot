const Discord = require("discord.js")
const { ChannelType } = require("discord.js")
const moment = require('moment')
module.exports = {

    name: "serverinfo",
    description: "Permet d'avoir les informations sur le serveur",
    dm: false,
    permission: "Aucune",
    category: "Informations",

    async run(bot, message, args) {
        
        const guild = message.guild
        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Informations de \`${message.guild.name}\``)
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: `${guild.name}`, iconURL: message.guild.iconURL({dynamic: true})})
        .setImage(bot.user.banner ? bot.user.banner : undefined)
        .setDescription(`
        **✉️ Information Général **✉️\n
        🤖Nom : \`${guild.name}\`
        📇Identifiant : \`${guild.id}\`
        👑 Propriétaire : \`${guild.ownerId}\`
        <:boost:1042453722002903110> Boost : \`${guild.premiumSubscriptionCount}\`
        <a:BoosterBadgesRoll:1042459248531079240> Tier : \`${guild.premiumTier}\`
        <:calendar:1042461572792070144> Créer le : <t:${moment(guild.createdAt).format("x")}:d>\n\n
        📊 **Informations Statistiques : 📊 **\n
        <:Discord_Bot:1042471598877323355>  Bot(s) : \`${guild.members.cache.filter(b => b.user.bot).size}\`
        <:membres:1042472695171928154> Membres : \`${guild.members.cache.filter(member => !member.user.bot).size}\`
        <:category:1042481387393003620> Catégories : \`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\`
        <:Discord_Voice_Channel:1042482473289928774>  Vocal : \`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\`
        <:Discord_Channel:1042482648284676127> Textuel : \`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\`
        <:7382discordsearch:1042484377235488818> Forum : \`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}\`
        <:5167discordemoji:1042483696848093274> Emojis : \`${guild.emojis.cache.size}\`
        `)
        await message.reply({embeds : [Embed]})

    }
}


/* Catégorie : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}
> Vocal : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}
> Textuel : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}
> Forum : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}
> Rôles : ${interaction.guild.roles.cache.size}
> Émojis : ${interaction.guild.emojis.cache.size}*/