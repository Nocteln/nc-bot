const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const Canvas = require('discord-canvas-easy')

module.exports = {
    name: "rules",
    description: "affiche les regles",
    permission: 'Aucune',
    dm: false,
    category: "utilitaire",
    options: [],

    async run(bot, message, args, db) {
        guild = message.guild
        const embed = new Discord.EmbedBuilder()
        .setColor("Purple")
        .setAuthor({name: "NormalCochon Team"})
        //.setTitle({content: "Règlement :", iconURL: guild.iconURL({dynamic: true})})
        .addFields(
            {name: "Afin de préserver le respect et le calme d'autrui sur notre serveur, le STAFF de la Team Normalcochon vous implique ce règlement.", value : " Ce règlement est considéré comme lu et approuvé dès l'arrivée sur ce discord. D’autre part, ce règlement est amené à évoluer, merci de le consulter régulièrement."},
            {name: '**Règle n°1 :**', value: 'Pour rappel, Discord est une plateforme Multi-générationnelle, merci de mesurer vos propos.Les règles sont à suivre à la lettre pour éviter d\'être BAN ou WARN... Que ce soit dans un salon texte ou dans un vocal !Merci de respecter les membres de ce serveur, et en particulier le Staff. Aucune insulte' },
            {name: "**Règle n°2 :**", value: "Veuillez ne pas publier des informations personnelles (numéro de tel, vie privé, adresses,…)Le spam et le flood sont à éviter sous peine de sanctions"},
            {name: "**Règle n°3 :**", value: "Il est interdit de faire de la pub sous toute forme (Message Privé aussi). Si quelqu'un vous fait de la pub en MP, faites un screen et signaler le à un membre du staff"},
            {name: "**Règle n°4 :**", value: "Il est interdit de promouvoir des techniques de hack / exploite sur des jeux ou tout autres programmes, ni de proposer,donner, ou vendre des items obtenue de façon non légitime."},
            {name: "**Règle n°5 :**", value: "Il est interdit de porter des propos haineux ou irrespectueux envers les gens, sur les religions, d'être raciste, antisémite ou homophobe. Les contenus pornographiques, religieux et même politiques sont  proscrits de ce serveur."},
            {name: "**Règle n°6 :**", value: "Tout Publication choquante (Gore , Violent , Pornographique) sont strictement interdit en Vocal ou Messages ! Tout comme des vidéos ou photos intimes / compromettantes d'autre membre ou de vous-même."},
            {name: "**Règle n°7 :**", value: "Si un de vos messages a été supprimé, c'est qu'un membre du staff l’a supprimé car votre message ne respectait pas ces règles ou n’était pas dans la bonne session. Ne pas mentionner un staff, Ils ne peuvent pas donner de raisons pour chaque message supprimer"},
            {name: "**Règle n°8 :**", value: "Les pseudos qui seront jugé irrespectueux, seront modifiés et la personne sera contactée en MP. Si la personne continue a utiliser un pseudo inapproprié cela donnera lieu à une expulsion du serveur."},
            {name: "**Règle n°9 :**", value: "Merci de ne pas faire de bruits ou de cris... dérangeant en vocal. Si vous êtes dans un environnement bruyant ou si vous n'arrivez pas à gérer votre micro correctement, mettez-vous en push-to-talk."},
            {name: "**Règle n°10 :**", value: "L'usurpation d'identité est strictement interdite, tout comme se faire passer pour un rôle/Bot que vous n’avez pas sur ce serveur."},
            {name: "**Règle n°11 :**", value: "Tous problème avec un membre, suite à une dispute qui a eu lieu dans un jeu, un autre serveur discord, ou sur tout autre plateforme ne doit pas transparaître ici."},
            {name: "**Règle n°12 :**", value: "Si ces règles ne sont pas respectées, le staff se réserve le droit de vous sanctionner sans contestation."}
        )
        .setAuthor({ name: 'Règlement', iconURL: guild.iconURL({dynamic: true})})
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setFooter({iconURL: guild.iconURL({dynamic: true}), text: `Règlement de ${guild.name}`})

        message.channel.send({embeds: [embed]})

    }
    
}