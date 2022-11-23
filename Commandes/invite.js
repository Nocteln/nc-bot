const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")
module.exports = {
    name: 'invite',
    description: 'Envoie le lien d\'invitation du bot',
    permission: 'Aucune',
    category: "utilitaire",
    dm: true,
    
    
    async run(bot,message) {

        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Invitations du bot")
        
        .addFields(
            {name: "Inviter le Bot", value: "[Clique ici !](https://discord.com/api/oauth2/authorize?client_id=831938139500970007&permissions=8&scope=bot%20applications.commands)"},
            {name: "Rejoindre le serveur de support", value: "[clique ici !](https://discord.gg/JhCBsTjGy2)"},
            {name: "Rejoindre Dev Aréa", value: "[clique ici](https://discord.gg/VhDZdqD7ZM)"}
        )
        .setTimestamp()
        .setFooter({ text: 'Merci <3', iconURL: 'https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=512' });

        await message.reply({embeds: [Embed]})
    }
}

