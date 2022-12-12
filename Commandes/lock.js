const { normalizeArray } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'lock',
    description: 'Fermer un salon',
    permission: Discord.PermissionFlagsBits.ManageChannels,
    utilisation: "/lock (role) (salon)",
    dm: false,
    category: "utilitaire",
    options: [{
        type: 'channel',
        name: "salon",
        description: "Le salon dont vous voulez bloquer l'envoi de messages",
        required: false,
        autocomplete: false,
    },
    {
        type: 'role',
        name: "role",
        description: "Le rôle dont vous voulez que personne n'envoie de messages",
        required: false,
        autocomplete: false,
    }],
    

    async run(bot, message, args) {

        let channel = args.getChannel('salon')
        if(!channel) channel = message.channel
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({embeds: [embedr("Red", "❌ erreur","Aucun salon trouvé !")]})
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.PublicThread && channel.type !== Discord.ChannelType.PrivateThread) return message.reply({embeds: [embedr("Red", "❌ erreur","Le salon doit être un salon textuel !")]})

        let role = args.getRole('role')
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply({embeds: [embedr("Red", "❌ erreur","le rôle n'as pas été trouvé !")]})
        if(!role) role = message.guild.roles.everyone

        if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes("SendMessages"))return message.reply({embeds: [embedr("Red", "❌ erreur",`Le rôle ${role.name} est déjà bloqué dans le salon ${channel} !`)]})

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false})
        else await channel.permissionOverwrites.create(role.id, {SendMessages: false})

        await message.reply({embeds: [embedr("Green", ":white_check_mark: success",`Le role ${role.name} à bien été bloqué dans le salon ${channel}`)]})


    }
}

