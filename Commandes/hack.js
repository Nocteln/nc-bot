
const { embedr } = require("../fonctions/embed")
const Discord = require('discord.js')

module.exports = {
    name: "hack",
    description: "hacker un membre",
    permission: 'Aucune',
    dm: false,
    category: "fun",
    options: [
        {
            type: 'user',
            name: 'membre',
            description: "le membre à hacker",
            required: true,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser('membre')
        let char = [..."123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
        let mdp = []

    
        for(let i =0; i<6; i++) mdp.push(char[Math.floor(Math.random()*char.length)])
        mdp = mdp.join('')


        let ip = "123.456.789.000"
        let mail = `${user.username}@gmail.com`
        
        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setFooter({text: "normalcochon-bot", iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.webp?size=512"})
        .addFields(
            {name: 'email', value: `\`${mail}\``},
            {name: "mot de passe", value: `\`${mdp}\``},
            {name: 'ip :', value: `\`${ip}\``}
        )
        .setTimestamp()
        .setTitle(`informations de ${user.tag}`)

        await message.reply({embeds: [Embed]})
        
    }
}