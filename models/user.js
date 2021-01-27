const {Schema, model, Types} = require('mongoose');


const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
       type: Date, 
       default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    posts: [{ type: Types.ObjectId, ref: 'Post'} ]
});

module.exports = model('User', schema);