const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post = require('../models/Posts');
const LikePost = require('../models/LikePost')
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path')




const register = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const err = new Error('الحساب مسجل مسبقاً');
    err.succes = false;
    next(err);
    return;
  }
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    })

    user.save()
      .then(user => {
        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
        res.json({
          message: 'user added succefuly',
          succes: true,
          token: token, _id: user._id
        })

      })

      .catch(error => {
        res.json({
          message: 'error occuted'
        })
      })


  })


}

const login = (req, res, next) => {

  var email = req.body.email
  var password = req.body.password

  User.findOne({ $or: [{ email: email }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err
            })
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
            res.json({
              message: 'login successfull',
              token: token, _id: user._id
            })
          } else {
            const err = new Error('كلمة السر خاطئة');
            next(err);

          }
        })
      } else {
        const err = new Error('الحساب غير موجود');
        next(err);
      }
    })
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete(id);
  if (!user) {
    const error = new Error('Could not find news.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'delete fetched.', user });
}

const AddPost = async (req, res, next) => {
  const post = req.body.post;
  const userId = req.body.userId;
  const avatar = req.file.path;

  const postData = new Post({
    post: post,
    userId: mongoose.Types.ObjectId(userId),
    avatar: avatar.split('\\')[1]
  });

  const result = await postData.save();
  res.status(201).json({ message: 'news created!', userId: result._id });
}

const getPost = async (req, res, next) => {
  const posts = await Post.find().populate({
    path: 'userId', select: {
      _id: 1,
      name: 1
    },
    avatar: 'avatar'
  });
  if (!posts) {
    const error = new Error('Could not find posts.');
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ message: 'news fetched.', posts });

}

const deletePost = async (req, res, next) => {

  const postId = req.params.postId;
  const userId = req.body.userId
  const post = await Post.findOne({ _id: postId, userId: userId });
  if (!post) {
    const error = new Error('Could not find Post.');
    error.statusCode = 404;
    throw error;
  }
  await Post.deleteOne({ _id: postId })
  res.status(200).json({ message: 'delete fetched.', post });
}

const like = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const Like = await LikePost.findOne({ userId: req.body.userId, postId: req.body.postId });
  if (Like) {
    const data = {
      "userId": userId,
      "postId": postId
    }
    await LikePost.deleteOne(data)

  }
  else {
    const data = new LikePost({
      userId: userId,
      postId: postId

    });

    const result = await data.save();
    res.status(201).json({ message: 'like!' });

  }

}




const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const posts = req.body.posts

  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.log('error')
    }
    post.post = posts;
    await post.save();
    res.status(201).json({ message: 'News updated!' });
  } catch (e) {
    res.status(201).json({ message: e.message, code: e.statusCode });
  }
}

const count = async (req, res, next) => {
  const posts = await LikePost.find();

  res.status(200).json({ posts });

}


module.exports = {
  register, login, deleteUser, AddPost, getPost, deletePost, like, updatePost, count
}