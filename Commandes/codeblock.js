
const { normalizeArray } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'codeblock',
    description: 'Envoyer un embed expliquant le codeblock',
    utilisation: "/codeblock",
    permission: 'Aucune',
    dm: false,
    category: "utilitaire",
    options: [],
    

    async run(bot, message, args) {

        const Embed = new Discord.EmbedBuilder()
        .setTitle("**Faire un codeblock**")
        .setDescription("Le codeblock est essentiel à la bonne compréhension du code. Il permettra aux membres du serveur de pouvoir copier votre code afin de le modifier.\nPour faire le codebloc, vous allez devoir utiliser le markdown de Discord qui est déjà intégré à votre application.\nPour réussir ce markdown, veuillez suivre le modèle ci-dessous en changant le 'js' par votre langage.")
        .setImage("https://media.discordapp.net/attachments/903662430192812032/1011984514207195217/unknown.png")
        .setFooter({text: "normalcochon-bot", iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.webp?size=512"})
        .setColor(bot.color)
        .setTimestamp()

        message.reply({embeds: [Embed]})
    

    }
}

