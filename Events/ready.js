const Discord = require("discord.js")
const loadSlashCommands = require("../loaders/loadSlashCommands")
const loadDb = require("../loaders/loadDatabase")

module.exports = async (bot, message) => {

    bot.db = await loadDb()
    bot.db.connect(function (err){
        if(err) console.log(`erreur dans la db : ${err}`)
        console.log("🔌 base de donnée connectée")
    })


    await loadSlashCommands(bot)

    console.log(`🤖 ${bot.user.tag} est en ligne`)

}