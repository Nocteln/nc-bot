const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const Discord = require("discord.js")
const { embedr } = require("../fonctions/embed")

module.exports = {
  name: 'new_help',
  permission: Discord.PermissionFlagsBits.Administrator,
  utilisation: "/new_help",
  category: "utilitaire",
  dm: true,
  description: 'Afficher toutes les commandes disponibles avec ce bot!',
  async run(bot, interaction) {
    if(interaction.user.id !== "562693590514532362") return interaction.reply({embeds: [embedr('Red', ':x: erreur', "commande en cours de développement !")]})
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Commands de ${bot.user.username}`)
      .setColor('#210030')
      .setDescription('**Veuillez sélectionner une catégorie pour afficher toutes mes commandes**')
      .addFields({name:`Liens:`, value:`[Discord-support](https://discord.gg/hqW6P2DD8B)`, inline:true})
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ๖̶ζ͜͡NGiveaway`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const giveaway = new Discord.EmbedBuilder()
      .setTitle("Categories » Giveaway")
      .setColor('#210030')
      .setDescription("```yaml\nVoici les commandes pour géré les Giveaways:```")
      .addFields(
        { name: 'Create / Start', value: `Démarrer un giveway dans votre serveur !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'Edit', value: `Modifier un giveaway déjà en cours !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'End', value: `Mettre fin à un giveaway déjà en cours !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'List', value: `Répertorier tous les giveaway en cours d'exécution au sein de ce serveur !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'Pause', value: `Mettre en pause un giveaway déjà en cours !\n > **Tipe: __\`slash\` / \`commande\`**`, inline: true },
        { name: 'Reroll', value: `Relancer un tirage au sort !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'Resume', value: `Reprendre un giveaway interrompu !\n > **Tipe: __\`slash\` / \`commande\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ๖̶ζ͜͡NGiveaway`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const general = new Discord.EmbedBuilder()
      .setTitle("Categories » General")
      .setColor('#210030')
      .setDescription("```yaml\nVoici les commandes générales du bot:```")
      .addFields(
        { name: 'Help', value: `Affiche toutes les commandes disponibles pour ce bot !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'Invite', value: `Obtenir le lien d'invitation du bot !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'Ping', value: `Vérifier la latence du bot !\n > **Tipes: __\`slash\` / \`commande\`__**`, inline: true },
        { name: 'hebergeur-info', value: "Permet d'afficher les informations sur l'hébergeur du bot !\n > **Tipe: __\`slash\` / \`commande\`__**"},
        { name: 'dons', value: "Permet d'envoyer de l'argent pour remercier la créations du bot !\n > **Tipe: __\`slash\` / \`commande\`__**"}
      )
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ๖̶ζ͜͡NGiveaway`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const components = (state) => [
      new Discord.ActionRowBuilder().addComponents(
        new Discord.SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Veuillez sélectionner une catégorie")
          .setDisabled(state)
          .addOptions([{
            label: `Giveaways`,
            value: `giveaway`,
            description: `Voir toutes les commandes basées sur les giveaways !`,
            emoji: `🎉`
          },
          {
            label: `General`,
            value: `general`,
            description: `Afficher toutes les commandes générales du bot !`,
            emoji: `⚙`
          }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector(
      {
        filter,
        componentType: "SELECT_MENU",
        idle: 300000,
        dispose: true,
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}