const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "add_xp",
    description: "ajoute de l'xp à un membre",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Expérience",
    options: [
        {
            type: 'user',
            name: "utilisateur",
            description: "le membre dont vous voulez ajouter de l'xp",
            required: true,
            autocomplete: false,
        },
        {
            type: 'number',
            name: 'quantité',
            description: "le nombre d'xp à àjouter",
            required: true,
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

            
            nombre = args.getNumber('quantité')
            

            //if(xp < nombre ) return message.reply({embeds: [embedr("Red", "❌ erreur",`le membre n'as que ${xp} d'experience`)]})
            
            const xpadd = xp+nombre
            if(req.length <1 ) {
                db.query(`INSERT INTO xp (guild, user, xp, level) VALUE ('${message.guildId}', '${user.id}', '${xpadd}', '0'`) 
                message.reply({embeds: [embedr("Green",":white_check_mark: succes",`${nombre}xp àjouté à ${user.tag}, il maintenant level ${level} avec ${xpadd} xp \n pour retirer des niveaux utilisez la comande </remove_level:0>`)]})
                return
            }
            db.query(`UPDATE xp SET xp = ${xpadd} WHERE guild = '${message.guildId}' AND user = '${user.id}'`)
            
            await message.reply({embeds: [embedr("Green",":white_check_mark: succes",`${nombre}xp àjouté à ${user.tag}, il maintenant level ${level} avec ${xpadd} xp \n pour retirer des niveaux utilisez la comande </remove_level:0>`)]})
        })
    })

    }
}
