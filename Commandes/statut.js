const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "statut",
    description: "affiche le statut des commandes sur le serveur",
    utilisation: "/statut",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Modération",
    dm: false,
    options: [
    //     {
    //         type: "string",
    //         name: "état",
    //         description: "état du système de suggestion (on/off)",
    //         required: true,
    //         autocomplete: true
    //     },
    //     {
    //         type: "channel",
    //         name: "salon",
    //         description: "Le salon où envoyer les suggestions",
    //         required: false,
    //         autocomplete: false
    //     },
    ],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guild = ${message.guildId}`, async (err, req) => {
            const captcha = req[0].captcha
            const antiraid = req[0].antiraid
            const antispam = req[0].antispam
            const suggest = req[0].suggest
            const xp = req[0].xp

            const Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Statut des commandes du serveur`)
            .setTimestamp()
            .setFooter({text: `Requète de ${message.user.tag}`, iconURL: message.user.displayAvatarURL({dynamic: true})})
            
            if(captcha !== "false" ) Embed.addFields({name: 'captcha : ', value: `\<:ok:1053301603525996575> \`on\`, salon : ${message.guild.channels.cache.get(captcha)}`})
            else Embed.addFields({name: 'captcha : ', value: `\<:nope:1053301586912366652> \`off\``})

            if(antiraid !== "false" ) Embed.addFields({name: 'antiraid : ', value: `\<:ok:1053301603525996575> \`on\``})
            else Embed.addFields({name: 'antiraid : ', value: `\<:nope:1053301586912366652> \`off\``})

            if(antispam !== "false" ) Embed.addFields({name: 'antispam : ', value: `\<:ok:1053301603525996575> \`on\``})
            else Embed.addFields({name: 'antispam : ', value: `\<:nope:1053301586912366652> \`off\``})

            if(suggest !== "false" ) Embed.addFields({name: 'suggestions : ', value: `\<:ok:1053301603525996575> \`on\`, salon : ${message.guild.channels.cache.get(suggest)}`})
            else Embed.addFields({name: 'suggestions : ', value: `\<:nope:1053301586912366652> \`off\``})

            if(xp !== "false" ) {
                if(xp !=="true") Embed.addFields({name: 'niveaux : ', value: `\<:ok:1053301603525996575> \`on\`, les messages de niveaux s'envoient dans le salon ${message.guild.channels.cache.get(xp)}`})
                else Embed.addFields({name: 'niveaux : ', value: `\<:ok:1053301603525996575> \`on\`, les messages de niveaux s'envoient dans les salons où ils ont été passés !`})
            } else Embed.addFields({name: 'niveaux : ', value: `\<:nope:1053301586912366652> \`off\``})
            
            
            
            
            

            await message.reply({embeds:[Embed]})
        })
        
    }
}