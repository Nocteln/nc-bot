const { PermissionFlagsBits } = require('discord.js')
const Discord = require('discord.js')
const { embedr } = require("../fonctions/embed")
const fetch = require('node-fetch')
const axios = require("axios")

module.exports = {
    name: "meme",
    description: "Envoie un meme aléatoire",
    utilisation: "/meme",
    permission: 'Aucune',
    dm: true,
    category: "Fun",
    options: [
        
    ],

    async run(bot, message, args) {
        async function getRandomMeme() {
            // Récupérer un mème aléatoire à l'aide de l'API de mèmes
            const { data } = await axios.get('https://api.imgflip.com/get_memes')
            // Vérifier que l'objet data existe et que la propriété memes est un tableau
            if (data && Array.isArray(data)) {
              // Sélectionner un mème au hasard à partir de la réponse de l'API
              const randomIndex = Math.floor(Math.random() * data.length)
              //const randomMeme = data.memes[randomIndex]
            
              // Créer un objet MessageAttachment à partir de l'URL de l'image de mème
              const attachment = new Discord.MessageAttachment(randomIndex.url)
            
              // Renvoyer l'objet MessageAttachment
              return attachment
            }
          }

          const randomMeme = await getRandomMeme()
          console.log(randomMeme)
    message.reply(randomMeme)
    }
}