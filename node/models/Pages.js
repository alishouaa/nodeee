const mongoose = require('mongoose');
const PostSchema = require('./Posts')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});


const PagesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        categories: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        posts: [
            {
                post: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                avatar: {
                    type: String,
                    required: true
                },
                comment: [
                    CommentSchema
                ],
            },
            { timestamps: true }
        ],
    },
    { timestamps: true },
);

const Pages = mongoose.model('Pages', PagesSchema)
module.exports = Pages;




