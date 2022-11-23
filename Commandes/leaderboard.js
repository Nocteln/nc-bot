const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")
const { embedr } = require("../fonctions/embed")

module.exports = {

    name: "leaderboard",
    description: "Affiche le classement de l'xp du serveur",
    permission: "Aucune",
    dm: false,
    category: "Expérience",
    options: [],

    async run(bot, message, args, db) {
        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, all) => {
            const active = all[0].xp
            if(active === 'false') return message.reply({embeds: [embedr("Red", "❌ erreur", "l'xp n'est pas activée sur ce serveur" )]})
        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, req) => {

            if(req.length < 1) return message.reply({embeds: [embedr("Red", "❌ erreur","Personne n'a de l'xp sur ce serveur!")]})

            await message.deferReply()

            const calculXp = (xp, level) => {
                let xptotal = 0;
                for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                xptotal += xp;
                return xptotal;
            }

            let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

            const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setBackground("https://img.20mn.fr/PITq6ei6Q_2mZFSuJaeU4A/1200x768_photographie-plus-coloree-univers-prise-hubble-publiee-3-juin-2014-nasa-esa")
            .setColorFont("#FFFFFF")

            for(let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {

                await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000)
            }

            const Image = await Leaderboard.toLeaderboard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Image.toBuffer(), {name: "leaderboard.png"})]})
        })
    })
    }
}