const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "suggest",
    description: "Envoie un sondage",
    utilisation: "/set_xp [nom] (salon)",
    permissions: 'Aucune',
    dm: false,
    category: "utilitaire",
    options: [
        {
            type: 'string',
            name: "idée",
            description: "Votre idée",
            required: true,
            autocomplete: false,
        },
        {
            type: 'string',
            name: "description",
            description: "Description de votre idée",
            required: true,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {
        
        let leVote = args.getString("idée") 
        let description = args.getString("description")
        

        db.query(`SELECT * FROM server WHERE guild = ${message.guildId}`, async (err, req) =>{

        let salon = req[0].suggest
        if(salon === "false")return message.reply({embeds: [embedr("Red",":x: erreur","Le système de suggestion est désactivé !")]})
        salon = message.guild.channels.cache.get(salon)
        //if(salon.id !== message.channel.id || !message.guild.channels.cache.get(salon.id)) return message.reply({embeds: [embedr("Red", "❌ erreur","Aucun salon trouvé !")]})

        
        //je pense qu'il faut renseigneer la variable salon
            if(!message.member.permissions.has(Discord.PermissionFlagsBits.SendMessages)) return message.reply({embeds: [embedr("Red", "❌ erreur","Tu n'as pas les permitions d'envoyer de message dans ce salon!")]})
            
            await message.reply({embeds: [embedr("Green", ":white_check_mark: succes", `Votre suggestion à bien été envoyée dans le salon :${salon}`)], ephemeral: true})
            const embed = new Discord.EmbedBuilder()
            .setAuthor({name: `suggestion de : ${message.user.tag}`,iconURL: message.member.displayAvatarURL({dynamic: true})})
            .setTitle(`<:suggest:1052298480489594940> Participe au sondage :`)
            .setColor('Random')
            .addFields({name: `idée : ${leVote}`, value:  `description : ${description}`})
            .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic:true})})
            .setTimestamp()

                
            
            await salon.send({ embeds: [embed] }).then(msg => {
                msg.react('✅');
                msg.react('❌');
          });
            
        
        })
    }
}
