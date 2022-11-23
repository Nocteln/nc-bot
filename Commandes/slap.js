const Discord = require("discord.js")

module.exports = {

    name: "slap",
    description: "Permet de gifler un membre du serveur",
    permission: "Aucune",
    dm: false,
    category: "fun",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à gifler!",
            required: true,
            autocomplete: false
        }
],

    async run(bot, message, args) {

        try {
            let user = args.getUser("membre")

            var random_gif = [
                "https://media.tenor.com/-RSry4HDatUAAAAC/slap-out-kast.gif",
                "https://media.tenor.com/pYXfwOc2JCQAAAAC/despierta-ya.gif",
                "https://media.tenor.com/D2rp6KYVLDsAAAAC/slap-bears.gif",
                "https://media.tenor.com/NY39ei1555IAAAAC/slap-slap-trough-computer.gif",
                "https://media.tenor.com/WsKM5ZDigvgAAAAS/penguin-penguins.gif",
            ];

            let embed_slap = new Discord.EmbedBuilder()
            .setTitle(`Gifle`)
            .setDescription(`${message.user} a gifler <@${user.id}>`)
            .setImage(`${random_gif[Math.floor(Math.random() * random_gif.length)]}`)
          
            await message.reply({embeds: [embed_slap]})

        } catch (err){

            return console.log(err);
        }
    }
}