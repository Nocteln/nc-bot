const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "remove_xp",
    description: "enleve l'xp d'un membre",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Expérience",
    options: [
        {
            type: 'user',
            name: "utilisateur",
            description: "l'xp du membre a retirer'",
            required: true,
            autocomplete: false,
        },
        {
            type: 'number',
            name: 'quantité',
            description: "le nombre d'xp à retirer",
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
        let nombre
        
        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, all) => {
            const active = all[0].xp
            if(active === 'false') return message.reply({embeds: [embedr("Red", "❌ erreur", "l'xp n'est pas activée sur ce serveur" )]})
        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err,req) => {
            
         

            const xp = parseInt(req[0].xp)
            const level = parseInt(req[0].level)

            if(args.getNumber('quantité')) {
            nombre = args.getNumber('quantité')
            } else nombre = xp   

            if(xp < nombre ) return message.reply({embeds: [embedr("Red", "❌ erreur",`le membre n'as que ${xp} d'experience`)]})
            if(req.length <1 ) return message.reply({embeds: [embedr("Red", "❌ erreur","Ce membre n'as pas d'xp!")]})
            const xpremove = xp-nombre

            db.query(`UPDATE xp SET xp = ${xpremove} WHERE guild = '${message.guildId}' AND user = '${user.id}'`)
            await message.reply({embeds: [embedr("Green",":white_check_mark: succes",`${nombre}xp retiré à ${user.tag}, il maintenant level ${level} avec ${xpremove} xp \n pour retirer des niveaux utilisez la comande </remove_level:0>`)]})
        })
    })

    }
}
