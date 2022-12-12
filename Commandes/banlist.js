const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "banlist",
    description: "permet d'afficher la liste des bannis du serveur'",
    utilisation: "/banlist",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [],

    async run(bot, message, args) {
        
        const Banlst = message.guild.bans.fetch()
        const Banned = await Banlst
        const Banlenght = Banned.map(a => a).length
        if(Banlenght < 1) return message.reply({embeds: [embedr("Red","❌ erreur","Il n'y à pas de bannis")]})
        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Liste des bannis du serveur \`(${Banlenght} bannis)\` :`)
        .setDescription(Banned.map(member => `tag: \`${member.user.tag}\` || id: \`${member.user.id}\``).join("\n"))


        
        message.reply({embeds: [Embed]})
        
            
        

    }
}