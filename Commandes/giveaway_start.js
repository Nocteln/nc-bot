const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { time } = require('@discordjs/builders')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")
const ms = require('ms')
const config = require('../config')
const msg = require('../autres/giveawaymessage')

module.exports = {
    name: "giveaway_start",
    description: "Lancer un giveaway",
    utilisation: "/giveaway_start [nombre de gagnants] [temps] [prix] [salon]",
    permissions: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "utilitaire",
    options: [
        {
            type: 'number',
            name: "gagnants",
            description: "Le nombre de gagnant du giveaway",
            required: true,
            autocomplete: false,
        },
        {
            type: 'string',
            name: "temps",
            description: "Le temps du giveaway",
            required: true,
            autocomplete: false,
        },
        {
            type: 'string',
            name: "prix",
            description: "Ce que vous voulez faire gagner",
            required: true,
            autocomplete: false,
        },
        {
            type: 'channel',
            name: "salon",
            description: "Le salon où envoyer le giveaway",
            required: true,
            autocomplete: false,
        },
    
    ],

    async run(bot, message, args, db) {

        if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }

        let salon = args.getChannel("salon")
        let winners = args.getNumber("gagnants")
        let temps = args.getString("temps")
        let prix = args.getString("prix")

        if(salon.type !== Discord.ChannelType.GuildText) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un salon __textuel__")]})
        if(winners <= 0) return message.reply({embeds: [embedr("Red",":x: erreur", "veuillez indiquer au moin 1 gagnant")]})

        bot.giveawaysManager.start(salon, {
            duration: ms(temps),
            prize: prix,
            channel: salon,
            winnerCount: winners,
            hostedBy: config.hostedBy ? message.user : null,
            message: msg
        })
/*
        let salon = args.getChannel("salon")
        if(!salon) return message.reply({embeds: [embedr("Red", ":x: erreur","Aucun salon trouvé!")]})
        if(salon.type !== Discord.ChannelType.GuildText) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un salon __textuel__")]})

        let winners = args.getNumber("gagnants")
        if(!winners) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un nombre de gagnants")]})
        if(winners <= 0) return message.reply({embeds: [embedr("Red",":x: erreur", "veuillez indiquer au moin 1 gagnant")]})
        

        let temps = args.getString("temps")
        if(!temps) return message.reply({embeds: [embedr("Red", ":x: erreur","Veuillez indiquer un temps !")]})
        if(isNaN(ms(temps))) return message.reply({embeds: [embedr("Red", ":x: erreur","Veuillez indiquer un temps valide !")]})
        
        let prix = args.getString("prix")
        if(!prix) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un prix à faire gagner !")]})


        const ID = await bot.function.createId("GIVEAWAY")

        db.query(`INSERT INTO giveaways (guild, channel, giveaway, author, price, winners, date, finish) VALUES ('${message.guildId}', '${salon.id}','${ID}', '${message.author ? message.author.id : message.user.id}', '${prix}', '${winners}', '${Date.now() + ms(temps)}', 'non')`);

        // let sql = `INSERT INTO giveaways (guild, channel, giveaway, author, price, winners, date, finish) VALUES ('${message.guildId}', '${salon.id}','${ID}', '${message.author ? message.author.id : message.user.id}', '${prix}', '${winners}', '${Date.now() + ms(temps)}', 'non')`
        // db.query(sql, function(err) {
        //     if(err) throw err
        // })
        
        
        
        let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setTitle("Nouveau giveaway")
            .setDescription(`**Auteur:** ${message.author ? message.author : message.user}\n**Prix:** ${prix}\n**Gagnants:** ${winners}\n**Fin:** <t:${Math.round((Date.now() + ms(temps))/1000)}:F>`) //\n**Fin:** ${time((Date.now() + ms(time)) / 1000, "F")}


            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId(`giveaway_${ID}`)
            .setLabel("Participer")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("🎉")
            )
        await message.reply({embeds: [embedr("Green", ":white_check_mark: succes", "giveaway créer avec succès")], ephemeral: true})
        await salon.send({embeds: [Embed], components: [btn]})
    */}
}
