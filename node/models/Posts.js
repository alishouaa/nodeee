const mongoose = require('mongoose');


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


const PostSchema = new Schema(
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
      required: false
    },

    comment: [
      CommentSchema
    ],
  },
  { timestamps: true }
);


const Post = mongoose.model('Post', PostSchema)


module.exports = Post;




