const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./loaders/loadCommands")
const loadEvents = require("./loaders/loadEvents")
const config = require("./config")
const { embedr } = require("./fonctions/embed")
const { guildId } = require("./config")
const { GiveawaysManager } = require('discord-giveaways');


bot.commands  = new Discord.Collection
bot.color = "#F5BFD9"
bot.function = {
    createId: require("./fonctions/createId"),
    generateCaptcha: require("./fonctions/generateCaptcha"),
    searchSpam: require("./fonctions/searchSpam"),
}

bot.login(config.token)

loadCommands(bot)
loadEvents(bot)

require(`./anti-crash.js`)();

const manager = new GiveawaysManager(bot, {
    storage: './autres/giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
bot.giveawaysManager = manager;


bot.on('messageCreate', message => {
    if (message.mentions.has(bot.user)) {
        message.channel.send({embeds: [embedr(bot.color, "On m'as ping????", "utilisez plutôt les slash commandes tels que </help:1033080477973745704>")]});
    }
});

bot.on('guildMemberAdd', member => {
    let channel
    if(member.guild.id === "706570232172511243") channel = bot.channels.cache.get("1044506278174666752")
    else if(member.guild.id === "1044003295322185819") channel = bot.channels.cache.get("1044003296265900126")
    else return
    channel.send(`<a:pandabgpngx:842321824025280512>  Bienvenue ${member}`)
})

