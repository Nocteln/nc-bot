/*const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "ban",
    description: "permet de bannir un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: 'user',
            name: "membre",
            description: "le membre a bannir",
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: "raison",
            description: "la raison du bannir ",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply({embeds: [embedr("Red", "❌ erreur","Je ne trouve pas de personne à bannir !")]})
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison a été fournie !";
            if(message.user.id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas vous bannir vous même !")]})

            if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas bannir le créateur du serveur !")]})

            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")

            if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous n'avez pas les permissions de bannir!")]})

            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [embedr("Red", "❌ erreur","Vous ne pouvez pas bannir ce membre !")]})

            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déja banni !")

            try {await user.send(`Tu as été banni du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

            await message.reply({embeds: [embedr("Green", ":white_check_mark: success",`${message.user} à banni \`${user.tag}\` pour la raison : \`${reason}\``)]})

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {
            console.log(err)
            return message.reply({embeds: [embedr("Red", "❌ erreur","veuillez réessayer !")]})
            
        }

    }
}*/

const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")

module.exports = {
    name: "ban",
    description: "Bannir un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: 'user',
            name: "membre",
            description: "le membre a bannir",
            required: true,
            autocomplete: false,
        }, {
            type: 'string',
            name: "raison",
            description: "la raison du bannir ",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("❌ erreur, Je ne trouve pas de personne à bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison");
            if(!reason) reason = "Aucune raison a été fournie !";
            if(message.user.id === user.id) return message.reply("❌ erreur, Vous ne pouvez pas vous bannir vous même !")

            if((await message.guild.fetchOwner()).id === user.id) return message.reply("❌ erreur, Vous ne pouvez pas bannir le créateur du serveur !")

            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")

            if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return message.reply("❌ erreur, Vous n'avez pas les permissions de bannir!")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("❌ erreur, Vous ne pouvez pas bannir ce membre !")

            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déja banni !")

            try {await user.send(`Tu as été banni du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison suivante : \`${reason}\``)} catch(err) {}

            await message.reply(`succes, ${message.user} a banni ${user.tag} pour la raison : ${reason}`)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {
            console.log(err)
            return message.reply("❌ erreur, veuillez réessayer !")
            
        }

    }
}