const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller')
const upload = require('../middelware/upload')



router.post('/register' , AuthController.register)
router.post('/login' , AuthController.login)
router.get('/getPost' , AuthController.getPost)
router.post('/addPost' ,upload.single('avatar'),AuthController.AddPost)
router.post('/delete-post/:postId', AuthController.deletePost);
router.post('/add-like' , AuthController.like);
router.post('/update-post/:postId', AuthController.updatePost);
router.get('/count-like' , AuthController.count)




module.exports = router