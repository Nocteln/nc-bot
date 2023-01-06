const Discord = require('discord.js')
module.exports = async () => {
    let char = [..."123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    let text = []

    for(let i =0; i<6; i++) text.push(char[Math.floor(Math.random()*char.length)])

    text = text.join('')

    console.log(text)
    return {text: text}
}