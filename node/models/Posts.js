const mongoose = require('mongoose');


const Schema  = mongoose.Schema

const UserSchema = new Schema(
  {
    post: {
      type: String,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar : {
        type: String,
        required: true
    },
    like:[{
      userId:mongoose.Schema.Types.ObjectId,
      isLike: Boolean
    }],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post',UserSchema)
module.exports = Post;




