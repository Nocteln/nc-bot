
const { normalizeArray } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'set_statut',
    description: 'Définir le statut',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Modération",
    options: [{
        type: "string",
        name: "activité",
        description: "l'activitée du bot'",
        required: true,
        autocomplete: true,
    },
    {
        type: "string",
        name: "statut",
        description: "le statut du bot'",
        required: true,
        autocomplete: false,
    },
    {
        type: "string",
        name: "lien",
        description: "lien du stream (si l'activitée choisie est \"streaming\"",
        required: false,
        autocomplete: false,
    },
],
    

    async run(bot, message, args) {
        if(message.user.id !== "562693590514532362") return message.reply({embeds: [embedr("Red", "❌ error", "Vous n'avez pas les permitions pour utiliser cette commande")]})
        let activity = args.getString('activité')
        if(activity !== 'Listening' &&  activity !== "watching" && activity !== "Playing" && activity !== "Streaming" &&activity !== "Competting") return message.reply({embeds: [embedr("Red", "❌ Error", "vous devez indiquer une activitée valide")]})

        if(activity === "Streaming" && !args.getString("lien")) return message.reply({embeds: [embedr("Red", "❌ error", "vous devez indiquer un lien twitch pour ce type d'activitée")]})
        if(activity === "Streaming" && !args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/))) return message.reply({embeds: [embedr("Red", "❌ error", "Le lien indiqué n'est pas valide, veuillez indiquer un lien twitch")]})
        let statut = args.getString('statut')
        if(statut === "Streaming")await bot.user.setActivity(statut, {type: Discord.ActivityType[activity], url: args.getString("lien")})
        else await bot.user.setActivity(statut, {type: Discord.ActivityType[activity]})
        await message.reply({embeds: [embedr("Green", ":white_check_mark: succes", `le statut à bien été changé en \`${activity} : ${statut}\``)]})

    }
}

