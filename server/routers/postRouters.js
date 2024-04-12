const express = require('express')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()

const{
    createPost,
    getAllPosts,
    showPost,
    updatePost,
    deletePost
} = require('../controllers/postController')

router.get('/'), getAllPosts
router.get('/:id', showPost);
router.post('/', upload.single('cover_photo'),createPost)
router.post('/', upload.single('cover_photo'),updatePost)
router.delete('/', deletePost);

module.exports = router