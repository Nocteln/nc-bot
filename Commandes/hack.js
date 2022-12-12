
// const { embedr } = require("../fonctions/embed")
// const Discord = require('discord.js')

// module.exports = {
//     name: "hack",
//     description: "hacker un membre",
//     permission: 'Aucune',
//     dm: false,
//     category: "fun",
//     options: [
//         {
//             type: 'user',
//             name: 'membre',
//             description: "le membre à hacker",
//             required: true,
//             autocomplete: false,
//         },
//     ],

//     async run(bot, message, args, db) {

//         let user = args.getUser('membre')
//         let char = [..."123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
//         let mdp = []

    
//         for(let i =0; i<6; i++) mdp.push(char[Math.floor(Math.random()*char.length)])
//         mdp = mdp.join('')


//         let ip = "123.456.789.000"
//         let mail = `${user.username}@gmail.com`
        
//         const Embed = new Discord.EmbedBuilder()
//         .setColor(bot.color)
//         .setFooter({text: "normalcochon-bot", iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.webp?size=512"})
//         .addFields(
//             {name: 'email', value: `\`${mail}\``},
//             {name: "mot de passe", value: `\`${mdp}\``},
//             {name: 'ip :', value: `\`${ip}\``}
//         )
//         .setTimestamp()
//         .setTitle(`informations de ${user.tag}`)

//         await message.reply({embeds: [Embed]})
        
//     }
// }

const Discord = require("discord.js")
const ms = module.require("ms");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    
    name: "hack",
    description: "Permet de hack quelqu'un",
    utilisation: "/hack [utilisateur]",
    permission: "Aucune",
    dm: false,
    category: "fun",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur a hack",
            required: true,
        }
    ],

    async run(bot, interaction, args, member) {
        let caracteres = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
        let ID = [];
        let user = args.getUser("utilisateur")
        const amount = Math.floor(Math.random() * 1000000000000000) + 1;
        for(let i = 0; i < 10; i++) ID.push(caracteres[Math.floor(Math.random() * caracteres.length)])
        let msg = await interaction.reply(`** <:hacker:1027194021598220308> Hack sur <@${user.id}> en cours ....**`);
    
        let time = "1s";
        setTimeout(function () {
          interaction.editReply(`** <:hacker:1027194021598220308> Découverte du mail et mot de passe de** <@${user.id}> .....`);
        }, ms(time));
    
        let time1 = "6s";
        setTimeout(function () {
          interaction.editReply(`** :email: Mail de : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time1));
    
        let time2 = "9s";
        setTimeout(function () {
          interaction.editReply("** <a:tap:1027197456389263402> Trouver d'autres comptes .....**");
        }, ms(time2));
    
        let time3 = "15s";
        setTimeout(function () {
          interaction.editReply("** <:voila:1027197597200416878> Configuration du compte Epic Games .....**");
        }, ms(time3));
    
        let time4 = "21s";
        setTimeout(function () {
          interaction.editReply("** <:hacker:1027194021598220308> Hack Compte Epic Games......**");
        }, ms(time4));
    
        let time5 = "28s";
        setTimeout(function () {
          interaction.editReply("** <:hacker:1027194021598220308> Compte Epic Games piraté !!**");
        }, ms(time5));
    
        let time6 = "31s";
        setTimeout(function () {
          interaction.editReply("** <a:tap:1027197456389263402> Collecte d'infos.....**");
        }, ms(time6));
    
        let time7 = "38s";
        setTimeout(function () {
          interaction.editReply("** <:hacker:1027194021598220308> Stransmettre des données au Gouvernement...**");
        }, ms(time7));
    
        let time8 = "41s";
        setTimeout(function () {
          interaction.editReply(`** <:voila:1027197597200416878> Piratage terminé de ${user.name} \n Mail : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time8));

    }
}