const Discord = require('discord.js')

const User = new Map()

module.exports = async message => {

    if(User.get(message.author.id)){
        console.log('test1')
        if(message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) return
        const data = User.get(message.author.id)
        console.log('test2')
        let difference = message.createdTimestamp - data.lastMessage.createdTimestamp

        let count = data.msgCount


        if(difference > 3000){
            console.log('test3')
            clearTimeout(data.timer)

            data.msgCount = 1

            data.lastMessage = message
        
            data.timer = setTimeout(() => {
                User.delete(message.author.id)
            }, 10000);
        
            User.set(message.author.id, data)
        } else {
            console.log('test4')

            count ++ 

            if(count > 3) {
                console.log('test5')
                await message.channel.send(`${message.author}, veuillez arreter de spam`)
                await message.member.timeout(10000, "1er avertissement de spam")
                console.log('test6')
                const messages = [...(await message.channel.messages.fetch({before: message.id})).filter(m=>m.author.id === message.author.id).values()].slice(0,10)
                await message.channel.bulkDelete(messages)
            } else {
                console.log('test7')
                data.msgCount = count
                User.set(message.author.id, data)
            }
        }
    } else {

        console.log('test8')
        let FN = setTimeout(() => {
           User.delete(message.author.id) 
        }, 10000);
        console.log('test9')
        User.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: FN
        })
    }
}