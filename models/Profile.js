//const {Schema, model, mongoose} = require('mongoose');
const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User' 
    },
    status: {
        type: String
    },
    bio:{
        type: String
    },
    rating:{
        type: String
    },
    title: {
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        telegram: {
            type: String
        }
    },
    coins: [
        {
               coin: {
                   type: mongoose.Schema.ObjectId,
                   ref: 'Coin'
               },
               coinId: {
                   type: String
               }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});




module.exports = Profile = mongoose.model('Profile', profileSchema);