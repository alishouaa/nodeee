const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post = require('../models/Posts');
const LikePost = require('../models/LikePost')
const CommentSchema = require('../models/Posts')
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path')
const Pages = require('../models/Pages');




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
      number: req.body.number,
      company: req.body.company,
      avatar: req.file.path.split('\\')[1]
    })

    user.save()
      .then(user => {
        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
        res.json({
          message: 'user added succefuly',
          succes: true,
          token: token, _id: user._id, username: user.name
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
              token: token, _id: user._id, username: user.name
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

const getUser = async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    const error = new Error('Could not find posts.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ users });
}


const AddPost = async (req, res, next) => {
  const avatar = req.file
  if (avatar){

    const postData = new Post({
      post: req.body.post,
      content: req.body.content,
      userId: mongoose.Types.ObjectId(req.body.userId),
      avatar: req.file.path.split('\\')[1]
    });

    const result = await postData.save();
    res.status(201).json({ message: 'news created!', userId: result._id });
  }else {
    const postData = new Post({
      post: req.body.post,
      content: req.body.content,
      userId: mongoose.Types.ObjectId(req.body.userId),
    });

    const result = await postData.save();
    res.status(201).json({ message: 'news created!', userId: result._id });
  }


}

const getPost = async (req, res, next) => {
  const posts = await Post.find().populate({
    path: 'userId', select: {
      _id: 1,
      name: 1,
      avatar: 1
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
    res.status(201).json({ message: 'is liked!' });

  } else {
    const data = new LikePost({
      userId: userId,
      postId: postId

    });
    const result = await data.save();
    res.status(201).json({ message: 'like!' });

  }


}

const deleteLike = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const Like = await LikePost.findOne({ userId: req.body.userId, postId: req.body.postId });
  if (!Like) {
    res.status(200).json({ message: 'not Like.' });
  } else {
    await LikePost.deleteOne({ _id: Like._id })
    res.status(200).json({ message: 'delete Like.' });

  }

}

const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { posts, content } = req.body;


  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.log('error')
    }
    post.post = posts;
    post.content = content;

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

const postComment = async (req, res, next) => {
  let data = {
    _id: mongoose.Types.ObjectId(),
    content: req.body.content,
    author: req.body.author
  };


  Post.findById(req.params.postId)
    .then(post => {
      if (!post) throw createError(404);
      post.comment.push(data);
      return post.save();
    })
    .then(post => {
      let comment = post.comment.id(data._id);
      // User.findById(comment.author)
      // .then(user => {
      //   if (!user) throw createError(404);
      //   console.log(user) ;
      // })
      res.json(comment);

    })


    .catch(next);
}
const AddPages = async (req, res, next) => {
  const name = req.body.name;
  const authorId = req.body.authorId;
  const categories = req.body.categories;
  const avatar = req.file.path
  const postData = new Pages({
    name: name,
    authorId: mongoose.Types.ObjectId(authorId),
    categories: categories,
    avatar: avatar.split('\\')[1]

  });

  const result = await postData.save();
  res.status(201).json({ message: 'news created!', userId: result._id });

}

const getPages = async (req, res, next) => {

  const page = await Pages.find()
  if (!page) {
    const error = new Error('Could not find pages.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ page });
}
const getOnePage = async (req, res, next) => {

  const page = await Pages.find({ name: req.params.namePage }).populate({
    path: 'authorId', select: {
      _id: 1,
      name: 1,
      avatar: 1
    }
  });
  if (!page) {
    const error = new Error('Could not find pages.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ page });
}


const postPages = async (req, res, next) => {
  let data = {
    _id: mongoose.Types.ObjectId(),
    post: req.body.post,
    content: req.body.content,
    userId: req.body.userId,
    avatar: req.file.path.split('\\')[1]

  };

  Pages.findById(req.params.pageId)
    .then(page => {
      if (!page) throw createError(404);
      page.posts.push(data);
      return page.save();
    })
    .then(page => {
      let posts = page.posts.id(data._id);
      res.json(posts);
    })
    .catch(next);
}


module.exports = {
  register, login, getPost, AddPost, deletePost, like,
  updatePost, count, deleteLike, postComment, getUser, AddPages, getPages, postPages, getOnePage
}