const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "avatar",
    description: "Permet de voir la photo de profil de quelqun",
    permission: 'Aucune',
    dm: false,
    category: "utilitaire",
    options: [
        {
            type: 'user',
            name: "utilisateur",
            description: "le membre dont vous voulez voir l'avatar",
            required: false,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {
        let user
        if(args.getUser('utilisateur')) {
            user = args.getUser('utilisateur')
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("je ne trouve pas le membre")
        } else user = message.user
        
        
        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Photo de profile de ${user.tag}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setURL(user.displayAvatarURL({ dynamic: true, size: 512}))
        
        await message.reply({embeds : [Embed]})
       
    }
}
