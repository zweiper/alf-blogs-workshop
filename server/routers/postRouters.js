const express = require('express')
const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const { getAllPosts, createPost, showPost, updatePost, deletePost } = require('../controllers/postController')

// /posts
router.get('/', getAllPosts)
router.get('/:id', showPost)
router.post('/', upload.single('cover_photo'), createPost)
router.put('/:id', upload.single('cover_photo'), updatePost)
router.delete('/:id', deletePost)


module.exports = router