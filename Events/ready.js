const Discord = require("discord.js")
const DBD = require('discord-dashboard')
const Theme = require('dbd-capriham-theme')
const loadSlashCommands = require("../loaders/loadSlashCommands")
const loadDb = require("../loaders/loadDatabase")
const config = require('../config')

module.exports = async (bot, message) => {

    bot.db = await loadDb()
    bot.db.connect(function (err){
        if(err) console.log(`erreur dans la db : ${err}`)
        console.log("🔌 base de donnée connectée")
    })
    let statut = "Bot crée par Nocteln#5241"
    await bot.user.setActivity(statut, {type: Discord.ActivityType.Watching})


    await loadSlashCommands(bot)

    let allcommands = []
    await bot.commands.forEach(commands => allcommands.push({commandName: commands.name, commandUsage: commands.utilisation}));

    console.log(`🤖 ${bot.user.tag} est en ligne`)

    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const Dashboard = new DBD.Dashboard({

        port: 8080,
        client: {
            id: bot.user.id,
            secret: config.secret
        },
        redirectUri: "http://localhost:8080/discord/callback",
        domain: "http://localhost",
        bot: client,
        theme: Theme({
            websiteName: "normalcochon",
            iconUrl: bot.displayAvatarUrl,
            index: {
                card:{
                    title: "Normalcochon-bot, le meilleur des robots",
                    description: "ajoutez le ^^"
                },
                informations: {
                    title: "infos",
                    description: "description"
                },

            },
            commands: {
                pageTitle: "commandes",
                table: {}
            }
        })


    })

    Dashboard.init()
}