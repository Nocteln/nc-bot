const Discord = require('discord.js');

module.exports = {

    name: "say",
    description: "Dire un message à la place du bot",
    permission: Discord.PermissionFlagsBits.Administrator,
    utilisation: "/say [message]",
    category: "fun",
    dm: false,
    options: [
        {
            type: "string",
            name: "message",
            description: "Le message que vous voulez envoyer",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let messages = args.getString('message')

        try{
            
            let SuccesEmbedBot = new Discord.EmbedBuilder()
                .setDescription(":white_check_mark: **Votre méssage à bien été envoyé !**")
                .setColor("Green")

            message.reply({embeds: [SuccesEmbedBot], ephemeral: true})
            await message.channel.send({content: `${messages}`})
        
        }catch(err) {console.log(err)}
    }
}