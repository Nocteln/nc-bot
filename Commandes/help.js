const Discord = require("discord.js")
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'affiche les commandes du bot et leurs descriptions',
    permission: 'Aucune',
    dm: true,
    category: "Informations",
    options: [
         {
            type: 'string',
            name: "commande",
            description: "la commande à afficher",
            required: false,
            autocomplete: true,
         }
    ],
    

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"))
            if(!command) return message.reply("Commande non trouvée")
        }

        if(!command) {
            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle('Commandes du bot')
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes disponibles : \`${bot.commands.size}\` \n Catégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "commandes du bot"})


            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                embed.addFields({name: `${cat}`,value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join('\n')}`})

            })

            await message.reply({embeds: [embed]})
        } else {
            let embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commande ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermitions requises : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en MP : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "commandes du bot"})

            await message.reply({embeds: [embed]})
        }

    }
}

