const Discord = require('discord.js');
const { embedr } = require("../fonctions/embed")
const responses = [
    "Il est certain",
    "Il est décidément ainsi",
    "Sans aucun doute",
    "Tu peux compter dessus",
    "Comme je le vois, oui",
    "Les signes indiquent oui",
    "Très probable",
    "Oui",
    "Les pronostics sont bons",
    "C'est assez certain",
    "Oui - définitivement",
    "Il semblerait que oui",
    "Mieux vaut ne pas te dire maintenant",
    "Je ne peux prédire maintenant",
    "Concentre-toi et demandes à nouveau",
    "Ne compte pas sur ça",
    "Ma réponse est non",
    "Mes sources disent non",
    "Très douteux",
    "Non",
    "N'y compte pas",
    "Mes signaux indiquent non",
    "Probablement pas",
    "Les signes pointent vers non",
    "Peu probable",
    "Non - définitivement",
    "Il semble que non",
    "Négatif",
    "Je ne pense pas",
    "Je suis désolé, mais non",
    "Je crains que non",
    "Désolé, mais la réponse est non",
    "Les perspectives ne sont pas bonnes",
    "Je ne suis pas sûr",
    "Je n'ai pas la réponse",
    "Je ne sais pas",
    "Je n'ai aucune idée",
    "Désolé, je n'ai pas la réponse",
    "Je n'ai aucun moyen de le savoir",
    "Je n'ai aucune réponse pour toi"
  ];

module.exports = {

    name: "8ball",
    description: "Répond à une question posée par un utilisateur en utilisant une réponse aléatoire",
    utilisation: "/8ball [question]",
    permission: 'Aucune',
    category: "fun",
    dm: true,
    options: [
        {
            type: "string",
            name: "question",
            description: "La question poser",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args, db) {
        
        const question = args.getString("question")
        if (!question) {
            return message.channel.send({embeds: [embedr("Red", ":x:","Vous devez poser une question à la boule de cristal.")]})
          }
      
          const responseIndex = Math.floor(Math.random() * responses.length)
          return message.reply({embeds: [embedr("Green", `question : \`${question}\``, responses[responseIndex])]})
        
    }
}