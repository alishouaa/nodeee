const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller')
const upload = require('../middelware/upload')
const uploadVideo = require('../middelware/uploadVideo')



router.get('/get-user', AuthController.getUser)
router.post('/register', upload.single('avatar'), AuthController.register)
router.post('/login', AuthController.login)
router.get('/getPost', AuthController.getPost)
router.post('/addPost', upload.single('avatar'), AuthController.AddPost)
router.post('/delete-post/:postId', AuthController.deletePost);
router.post('/add-like', AuthController.like);
router.post('/delete-like', AuthController.deleteLike);
router.post('/update-post/:postId', AuthController.updatePost);
router.get('/count-like', AuthController.count)
router.post('/comment-post/:postId', AuthController.postComment);
router.post('/addPages',upload.single('avatar'), AuthController.AddPages);
router.get('/getPages', AuthController.getPages);
router.post('/getOnePage/:namePage', AuthController.getOnePage);
router.post('/postPages/:pageId',upload.single('avatar'), AuthController.postPages);






module.exports = router