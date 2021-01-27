const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    title:{
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
    },
    body: {
        type: {},
        min: 200,
        max: 2000000,
    },
    excerpt: {
        type: String,
        max: 1000
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        index: 32

    },
    photo: {
        type: String,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    voteCount: {
        type: Number,
        default: 0
    },
    upVote: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        }
    ],
    deVote: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    coments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                require: true
            },
            author:{
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    categories: [{type: Schema.Types.ObjectId, ref:'Category', require: true}],
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = Posts = mongoose.model('Post', PostSchema);