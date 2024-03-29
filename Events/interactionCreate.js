const Discord = require("discord.js")

module.exports = async (bot, interaction, args) => {

    var db = bot.db

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()
        if(interaction.commandName === "help") {
        let choices = bot.commands.filter(cmd =>cmd.name.includes(entry))
        await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice =>({name: choice.name, value: choice.name})))
        }

        if(interaction.commandName === "set_captcha" || interaction.commandName === "set_antiraid" || interaction.commandName === "set_xp" || interaction.commandName === "set_antispam" || interaction.commandName === "set_suggest" ) {
            let choices = ["on", "off"]
            let sortie = choices.filter(c =>c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c =>({name: c, value: c})))
            }

            if(interaction.commandName === "set_statut") {
                let choices = ['Listening', "watching", "Playing", "Streaming", "Competting"]
                let sortie = choices.filter(c =>c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c =>({name: c, value: c})))
            }

            if(interaction.commandName === "roles") {
                let choices = ['ajouter', "retirer"]
                let sortie = choices.filter(c =>c.includes(entry))
                await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c =>({name: c, value: c})))
            }

    }

    


    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)

        command.run(bot, interaction, interaction.options, db)
    }

    if(interaction.type === 3){ // 3 = menu
        if(interaction.customId === "reactionrole"){
            bot.db.query(`SELECT * FROM server WHERE guild = '${interaction.guildId}'`, async(err, req) => {
                let roles = req[0].reactionrole.split(' ')
                if(roles.length <= 0) return

                await interaction.deferReply({ephemeral:true})

                let retiredroles = []
                let addroles = []

                for(let i=0; i<roles.length;i++){
                    if(interaction.member.roles.cache.has(roles[i]) && interaction.values.includes(roles[i])){
                        interaction.member.roles.remove(roles[i])
                        retiredroles.push(roles[i])
                    }
                }

                for(let i=0; i<interaction.values.length;i++){
                    interaction.member.roles.add(interaction.values[i])
                    addroles.push(interaction.values[i])
                }

                await interaction.followUp({content: `${addroles.length <= 0 ? "" : `Les rôles ${addroles.map(r=> `\`${interaction.guild.roles.cache.get(r).name}\``).join(", ")} vous ont été ajoutés`}  \n${retiredroles.length <=0 ? "" : `Les rôles ${retiredroles.map(r=> `\`${interaction.guild.roles.cache.get(r).name}\``).join(", ")} vous ont été retiré`}`, ephemeral:true})
            })
        }
    }

    

    if(interaction.isButton()) {
        if(interaction.customId == "ticket") {
            await interaction.deferReply({ephemeral: true})
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
            await channel.setTopic(interaction.user.id)
            await interaction.editReply({content: `Votre ticket à bien été créé : ${channel}`, ephemeral: true})

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
            .setEmoji("<:croix:1044564209016504340>")
            )

            await channel.send({content: `${interaction.user}`,embeds : [Embed], components: [btn]})
        }
        

        if(interaction.customId === "close") {
            let user = bot.users.cache.get(interaction.channel.topic)
            try {await user.send("Votre ticket à été fermé !")} catch(err){}

            await interaction.channel.delete()

        }

        if (interaction.customId === "primary") {
            user = interaction.user
            const filter = i => i.customId === 'primary'
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });

                collector.on('collect', async i => {
                    await i.update({ content: "", components: [row2] });
                });
            
                
            
            db.query(`SELECT * FROM xp WHERE guild = '${interaction.guildId}' AND user = '${user.id}'`, async (err,req) => {
                const xpg = interaction.options.getNumber('quantité')
                const xp = parseInt(req[0].xp)
                const level = parseInt(req[0].level)                             
                const xpadd = xpg+xp
    
                if(req.length <1 ) {
                    db.query(`INSERT INTO xp (guild, user, xp, level) VALUE ('${interaction.guildId}', '${user.id}', '${xpadd}', '0'`) 
                    return interaction.reply({embeds: [embedr("Green",":white_check_mark: Bien joué :tada:",`${user.tag} à récupéré le drop de ${nombre}xp, il maintenant level ${level} avec ${xpadd} xp`)]})
                }
                db.query(`UPDATE xp SET xp = ${xpadd} WHERE guild = '${interaction.guildId}' AND user = '${user.id}'`)
                await interaction.reply({embeds: [embedr("Green",":tada: Bien joué :tada:",`${user.tag} à récupéré le drop de ${xpg}xp, il maintenant level ${level} avec ${xpadd} xp`)]})  
        })
          
        }

        if(interaction.customId.startsWith('giveaway_')) {
            let ID = interaction.customId.split("_")[1]
            db.query(`SELECT * FROM gwparticipants WHERE id = '${interaction.user.id} ${ID}'`, async (err, req) => {
                if(req.length < 1) {
                    let sql = `INSERT INTO gwparticipants (id, giveaway, user) VALUES ('${interaction.user.id} ${ID}','${ID}', ${interaction.user.id})`
                    db.query(sql, function(err){
                        if(err) throw err
                    })

                    await interaction.reply({content: `**Participation validée pour le concours**`, ephemeral: true})
                } else {
                    db.query(`DELETE FROM gwparticipants WHERE id = '${interaction.user.id} ${ID}'`)
                    await interaction.reply({content: `Participation retirée`, ephemeral: true })
                }

                
            })
        }
    }
}