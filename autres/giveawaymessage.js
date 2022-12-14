const config = require('../config.js');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"๐๐ **GIVEAWAY** ๐๐",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"๐๐ **GIVEAWAY FINI** ๐๐",
    inviteToParticipate: "Rรฉagit avec ๐ pour participer!",
    dropMessage: "Soyez le premier ร  rรฉagir avec ๐ !",
    drawing: 'Fin: {timestamp}',
    winMessage: "GG, {winners}! Tu as gagnรฉ **{this.prize}**!",
    embedFooter: "Giveaways",
    noWinner: "Giveaway annulรฉ, pas de participants.",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "gagnant(s)",
    endedAt: "Fini ร  : "
};