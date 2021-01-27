const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
    coinId: {
        type: String
    },
    symbol: {
        type: String
    },
    name: {
        type: String
    }

});

module.exports = Coin = mongoose.model('Coin', CoinSchema);

