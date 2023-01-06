const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "add_level",
    description: "ajoute des niveaux à un membre",
    utilisation: "/add_level [utilisateur] [quantité]",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Expérience",
    options: [
        {
            type: 'user',
            name: "utilisateur",
            description: "Le membre dont vous voulez ajouter des niveaux",
            required: true,
            autocomplete: false,
        },
        {
            type: 'number',
            name: 'quantité',
            description: "le nombre de niveaux à ajouter",
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

            
            
            const xpadd = level+nombre

            if(req.length <1 ) {
                db.query(`INSERT INTO xp (guild, user, xp, level) VALUE ('${message.guildId}', '${user.id}', '0', '${xpadd}'`) 
                message.reply({embeds: [embedr("Green",":white_check_mark: succes",`${nombre}xp àjouté à ${user.tag}, il maintenant level ${xpadd} avec ${xp} xp \npour ajouter de l'experience, utilisez la comande </add_xp:0>`)]})
                return
            }

            db.query(`UPDATE xp SET level = ${xpadd} WHERE guild = '${message.guildId}' AND user = '${user.id}'`)
            await message.reply({embeds: [embedr("Green",":white_check_mark: succes",`${nombre} level ajouté à ${user.tag}, il maintenant level ${xpadd} avec ${xp} xp \npour ajouter de l'experience, utilisez la comande </add_xp:0>`)]})
        })
        
    })
    }
}
