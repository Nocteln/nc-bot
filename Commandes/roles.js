const { normalizeArray } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: 'roles',
    description: 'Permet d\'ajouter ou de retirer un role au rôle react',
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [{
        type: 'string',
        name: "action",
        description: "ajouter ou enlever",
        required: true,
        autocomplete: true,
    },
    {
        type: 'role',
        name: "role",
        description: "Le rôle à ajouter ou retirer",
        required: true,
        autocomplete: false,
    }],
    

    async run(bot, message, args, db) {
        let action = args.getString("action")
        if(action !== "ajouter" && action !== "retirer") return message.reply({embeds: [embedr('Red', ':x: erreur', "veuillez indiquer ajouter ou retirer")]})

        let role = args.getRole("role")
        if(!message.guild.roles.cache.get(role.id)) return message.reply({embeds: [embedr('Red', ':x: erreur', "pas de role trouvé")]})
        if(role.managed) message.reply({embeds: [embedr('Red', ':x: erreur', "indiquer un rôle non géré !")]})

        if(action === "ajouter"){

            db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req)=>  {
                let roles = req[0].reactionrole.split(" ")
                if(roles.lenght >= 25) message.reply({embeds: [embedr('Red', ':x: erreur', "Vous ne pouvez pas ajouter plus de 25 roles !")]})

                if(roles.includes(role.id)) message.reply({embeds: [embedr('Red', ':x: erreur', "Ce rôle est déjà présent dans le réaction role")]})

                await roles.push(role.id)

                await db.query(`UPDATE server SET reactionrole = '${roles.filter(item => item !== '').join(' ')}' WHERE guild = '${message.guildId}'`)
                await message.reply({embeds: [embedr('Green', ':white_check_mark: sucess', `Le rôle \`${role.name}\`  à bien été ajouté !`)]})


            })
        }

        if(action === "retirer") {
            db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req)=>  {
                let roles = req[0].reactionrole.split(" ")
                if(roles.lenght <= 0) message.reply({embeds: [embedr('Red', ':x: erreur', "Il n'y a aucun rôle à retirer !")]})

                if(!roles.includes(role.id)) return message.reply({embeds: [embedr("Red", ":x: erreur", "Ce rôle n'est pas dans le reaction role")]})

                let number = roles.indexOf(role.id)
                delete roles[number]

                await db.query(`UPDATE server SET reactionrole = '${roles.filter(item => item !== '').join(' ')}' WHERE guild = '${message.guildId}'`)
                await message.reply({embeds: [embedr('Green', ':white_check_mark: sucess', `Le rôle \`${role.name}\`  à bien été ajouté !`)]})




            })
        }
        }


    }


