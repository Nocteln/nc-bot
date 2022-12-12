const Discord = require('discord.js')

const User = new Map()

module.exports = async message => {

    if(User.get(message.author.id)){
        if(message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) return
        const data = User.get(message.author.id)
        let difference = message.createdTimestamp - data.lastMessage.createdTimestamp

        let count = data.msgCount


        if(difference > 3000){
            clearTimeout(data.timer)

            data.msgCount = 1

            data.lastMessage = message
        
            data.timer = setTimeout(() => {
                User.delete(message.author.id)
            }, 10000);
        
            User.set(message.author.id, data)
        } else {

            count ++ 

            if(count > 3) {
                await message.channel.send(`${message.author}, veuillez arreter de spam`)
                await message.member.timeout(10000, "1er avertissement de spam")
                const messages = [...(await message.channel.messages.fetch({before: message.id})).filter(m=>m.author.id === message.author.id).values()].slice(0,10)
                await message.channel.bulkDelete(messages)
            } else {
                data.msgCount = count
                User.set(message.author.id, data)
            }
        }
    } else {

        let FN = setTimeout(() => {
           User.delete(message.author.id) 
        }, 10000);
        User.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: FN
        })
    }
}