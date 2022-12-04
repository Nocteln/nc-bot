const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./loaders/loadCommands")
const loadEvents = require("./loaders/loadEvents")
const config = require("./config")
const { embedr } = require("./fonctions/embed")
const { guildId } = require("./config")

bot.commands  = new Discord.Collection
bot.color = "#F5BFD9"
bot.function = {
    createId: require("./fonctions/createId"),
    generateCaptcha: require("./fonctions/generateCaptcha"),
}

bot.login(config.token)

loadCommands(bot)
loadEvents(bot)

require(`./anti-crash.js`)();

bot.on('messageCreate', message => {
    if (message.mentions.has(bot.user)) {
        message.channel.send({embeds: [embedr(bot.color, "On m'as ping????", "utilisez plutôt les slash commandes tels que </help:1033080477973745704>")]});
    }
});

bot.on('guildMemberAdd', member => {
    let channel
    if(guildId === "706570232172511243") channel = bot.channels.cache.get("1044506278174666752")
    if(guildId === "1044003295322185819") channel = bot.channels.cache.get("1044003296265900126")
    
    channel.send(`<a:pandabgpngx:842321824025280512>  Bienvenue ${member}`)
})