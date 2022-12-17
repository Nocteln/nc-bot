const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const config = require("../config")

module.exports = {
    name: "userinfo",
    description: "obtenir les informations sur un utilisateur",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Informations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre dont vous voulez voir les informations",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        let user
        if(args.getUser('membre')) {
            user = args.getUser('membre')
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("je ne trouve pas le membre")
        } else user = message.user

        const member = await message.guild.members.cache.get(user.id) 
        const user_embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        //.setAuthor(user.avatarUrl({dynamic: true}))
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({dynamic:true}))
        .addFields([
            {name: "**ID :**", value: user.id},
            {name: '**TAG : **', value: user.tag},
            {name: "**Date de création du compte :**", value: `<t:${Math.round(user.createdTimestamp / 1000)}:F> => <t:${Math.round(user.createdTimestamp / 1000)}:R>`},
            {name: "**A rejoint le serveur le :**", value: `<t:${Math.round(member.joinedTimestamp/1000)}:F> => <t:${Math.round(member.joinedTimestamp/1000)}:R>`}, 
            {name: "**Rôles :**", value: `${member.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "Aucun"} (${member.roles.cache.size - 1})`},
        
        ])
        .setFooter({text: `requète de ${message.user.tag}`, iconURL: message.user.displayAvatarURL({dynamic: true})}) 
        .setAuthor({ name: `informations de ${user.tag}`, iconURL: user.displayAvatarURL({dynamic: true}), url: user.displayAvatarURL({dynamic: true}) })
        
        if(config.dev === user.id) user_embed.setTitle(':crown: Developpeur du bot')
        if(message.guild.ownerId === user.id) user_embed.setTitle(':crown: Propriétaire du serveur')


        await message.reply({embeds: [user_embed]})


    }
}