const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "rank",
    description: "Donne l'xp d'un membre",
    permission: 'Aucune',
    dm: false,
    category: "Expérience",
    options: [
        {
            type: 'user',
            name: "utilisateur",
            description: "l'xp du membre a voir'",
            required: false,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {
        let user
        if(args.getUser('utilisateur')) {
            user = args.getUser('utilisateur')
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("je ne trouve pas le membre")
        } else user = message.user
        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, all) => {
            const active = all[0].xp
            if(active === 'false') return message.reply({embeds: [embedr("Red", "❌ erreur", "l'xp n'est pas activée sur ce serveur" )]})
        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err,req) => {
            
            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err,all) => {
            
            if(req.length <1 ) return message.reply({embeds: [embedr("Red", "❌ erreur","Ce membre n'as pas d'xp!")]})

            await message.deferReply()

            const calculXp = (xp, level) => {
                let xptotal = 0
                for(let i = 0; i < level + 1; i++) xptotal += i*1000
                xptotal+=xp
                return xptotal
            }
            const leaderboard = all
            .map((data) => ({ ...data, totalXp: calculXp(parseInt(data.xp), parseInt(data.level)) }))
            .sort((a,b) => b.totalXp - a.totalXp)

            let xp = parseInt(req[0].xp)
            let level = parseInt(req[0].level)
            let rank = leaderboard.findIndex(r => r.user === user.id) + 1
            let need = (level+1)*1000

            let Card = await new Canvas.Card()
            .setBackground('https://i.notretemps.com/1400x787/smart/2022/07/13/webb.jpg')
            .setBot(bot)
            .setColorFont("#ffffff")
            .setRank(rank)
            .setUser(user)
            .setColorProgressBar(bot.color)
            .setGuild(message.guild)
            .setXp(xp)
            .setLevel(level)
            .setXpNeed(need)
            .toCard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: 'rank.png'})]})
        })
        })
    })

    }
}