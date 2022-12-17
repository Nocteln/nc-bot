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
    await bot.commands.forEach(commands => allcommands.push({commandName: commands.name, commandUsage: commands.utilisation, commandDescription: commands.description}));

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
        minimalizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        bot: bot,
        theme: Theme({
            websiteName: "normalcochon",
            iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true",
            index: {
                card: {
                    title: "normalcochonbot",
                    description: "ajoutez le"
                },
                information: {
                    title: "jsp",
                    description: "description",
                    image: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true"
                },
                feeds: {
                    title: "Feeds",
                    list: [
                        {
                        icon: "fa fa-user",
                        text: "New user Registred",
                        timeText: "just now",
                        bg: "bg-light-info"
                        }, {
                        icon: "fa fa-server",
                        text: "server issue",
                        timeText: "3min ago",
                        bg: "bg-light-danger"   
                        }
                    ] 
                },

            },
            commands: {
                pageTitle: "commandes",
                table: {
                    title: "Toutes les commandes",
                    subTitle: "salu1111",
                    list: allcommands
                }
            }
        }),
        settings: []


    })

    Dashboard.init()
/*
    setInterval(async () => {
        const db = bot.db
        db.query(`SELECT * FROM giveaways`, async (err,req)=> {
            if(req.length <1) return

            for(let i; i<req.length; i++) {
                
                if(Date.now() >= parseInt(req[i].date) && req[i].finish === 'non') {

                    console.log("cc")
                    let channel = bot.guild.cache.get(req[i].guild).channel.cache.get(req[i].channel)
                    if(!channel) return db.query(`DELETE FROM giveaways WHERE giveaway = '${req[i].giveaway}'`)
                    
                    db.query(`SELECT * FROM gwparticipants WHERE giveaway = '${req[i].giveaway}'`, async (err,parts) => {
                        if(parseInt(req[i].winners) > parseInt(parts.length)) return channel.send(`Il n'y as pas assez de participants dans le giveaway`)

                        let number = Math.floor(Math.random()* parseInt(req[i].winners))
                        let winner = bot.user.cache.get(parts[number].user)
                        console.log("ccccc")
                        await db.query(`UPDATE giveaways SET finish = 'oui' WHERE giveaway = '${req[i].giveaway}'`)

                        channel.send(`Le gagnant est ${winner}`)
                    })
                }

            }
        })
    })*/
}