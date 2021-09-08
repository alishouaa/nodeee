const mongoose = require('mongoose');


const Schema  = mongoose.Schema

const UserSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  { timestamps: true }
);

const LikePost = mongoose.model('LikePost',UserSchema)
module.exports = LikePost;




