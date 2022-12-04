const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = async () => {
    let char = [..."123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    let text = []

    for(let i =0; i<6; i++) text.push(char[Math.floor(Math.random()*char.length)])

    text = text.join('')

    const canvas = Canvas.createCanvas(300,150)
    const ctx = canvas.getContext("2d")

    ctx.font = "35px 'Arial"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(text, (150 - (ctx.measureText(text).width) / 2), 85)
    console.log(text)
    return {canvas: canvas, text: text}
}