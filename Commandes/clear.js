const { normalizeArray } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'clear',
    description: 'Supprimer plusieurs messages en même temps',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "utilitaire",
    options: [ 
        {
        type: 'number',
        name: "nombre",
        description: "Le nombre de message à supprimer",
        required: true,
        autocomplete: false,
    },
        {
            type: 'channel',
            name: "salon",
            description: "Le salon où vous voulez supprimer les messages",
            required: false,
            autocomplete: false,
        }
    ],
    

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({embeds: [embedr("Red", "❌ erreur","Aucun salon trouvé !")]})

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({embeds: [embedr("Red", "❌ erreur","le nombre de messages à supprimer doit etre compris entre 0 et 100")]})

        

        try {

            let messages = await channel.bulkDelete(parseInt(number))
            await message.reply({embeds: [embedr("Green", ":white_check_mark: success",`${messages.size} messages suprimés dans le salon ${channel}`)]})
       
        } catch(err) {
            let messages = [...(await channel.messages.fetch()).filter(msg => (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.reply({embeds: [embedr("Green", ":white_check_mark: succes",`Aucun message à supprimer car ils datent de plus de 14 jours`)]})
            
            await channel.bulkDelete(messages)
            await message.reply({embeds: [embedr("Red", "❌ erreur",{embeds: [embedr("Green", ":white_check_mark: succes",`${messages.size} messages suprimés car les autres dataient de plus de 14 jours`)]})]})
        }


    }
}

