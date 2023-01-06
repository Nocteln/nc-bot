const fetch = require('node-fetch')
const axios = require("axios")
const Discord = require("discord.js")

module.exports = async () => {

    // Utiliser axios pour faire une requête GET à l'API de mèmes
  const { data } = await axios.get('https://api.imgflip.com/get_memes')

  // Sélectionner un mème au hasard à partir de la réponse de l'API
  const randomIndex = Math.floor(Math.random() * data.memes.length)
  const randomMeme = data.memes[randomIndex]

  const attachment = new Discord.MessageAttachment(randomMeme.url)
  // Renvoyer l'URL de l'image de mème
  return attachment
      
      
}