const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    var db = bot.db

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()
        if(interaction.commandName === "help") {
        let choices = bot.commands.filter(cmd =>cmd.name.includes(entry))
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice =>({name: choice.name, value: choice.name})))
        }

        if(interaction.commandName === "set_captcha" || interaction.commandName === "set_antiraid" || interaction.commandName === "set_xp") {
            let choices = ["on", "off"]
            let sortie = choices.filter(c =>c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c =>({name: c, value: c})))
            }
    }

    


    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)

        command.run(bot, interaction, interaction.options, db)
    }


    

    if(interaction.isButton()) {
        if(interaction.customId == "ticket") {
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText,
               
            })
            
            await channel.setParent(interaction.channel.parent.id)
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone.id, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1044006782244233226", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `Votre ticket à bien été créé : ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Création d'un ticket")
            .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            .setDescription("Ticket créé !")
            .setTimestamp()
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic:true})})

            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("<:croix:1044564209016504340> ")
            )

            await channel.send({embeds : [Embed], components: [btn]})
        }

        if(interaction.customId === "close") {
            let user = bot.users.cache.get(interaction.channel.topic)
            try {await user.send("Votre ticket à été fermé !")} catch(err){}

            await interaction.channel.delete()
        }
    }
}