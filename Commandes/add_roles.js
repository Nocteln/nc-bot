const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "add_roles",
    description: "Bannir un membre",
    utilisation: "/ban [utilisateur] (raison)",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: 'role',
            name: "role",
            description: "le role à ajouter",
            required: true,
            autocomplete: false,
        },{
            type: 'user',
            name: "membre",
            description: "le membre à qui ajouter le role",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        if(id !== "562693590514532362")return message.reply({embeds: [embedr("Red", ":x: erreur", "Commande désactivée!")]})

        let role = args.getRole('role')
        if(!role) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un rôle")]})

        let member = args.getUser("membre")
        if(!member) return message.reply({embeds: [embedr("Red", ":x: erreur", "Veuillez indiquer un membre à qui ajouter le rôle")]})

        //if(member.roles.cache.has(role.id)) return message.reply({embeds: [embedr("Red", ":x: erreur", "Ce membre à déjà ce rôle")]})


        try {
        await member.addRole(role)
        }catch(err) {console.log(err)}


    }
}