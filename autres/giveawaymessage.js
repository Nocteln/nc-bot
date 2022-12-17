const config = require('../config.js');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY FINI** 🎉🎉",
    inviteToParticipate: "Réagit avec 🎉 pour participer!",
    dropMessage: "Soyez le premier à réagir avec 🎉 !",
    drawing: 'Fin: {timestamp}',
    winMessage: "GG, {winners}! Tu as gagné **{this.prize}**!",
    embedFooter: "Giveaways",
    noWinner: "Giveaway annulé, pas de participants.",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "gagnant(s)",
    endedAt: "Fini à : "
};