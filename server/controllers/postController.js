// CRUD functions for the DB using the Post Model
const Post = require('../models/postModel')
const deleteFile = require('../utils/deleteFile')

// @desc    Gets All Posts
// @route   GET /posts
// access   Public
const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find()

        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Post
// @route   POST /posts
// access   Public
const createPost = async (req, res) => {
    // Check if req.body exists
    if (!req.body) {
        res.status(400).json({ error: 'No request body'})
    }

    // Get the fields from req.body
    const { title, author, content } = req.body

    // Optionally check if req.file exists 
    const path = req.file?.path ?? null

    try {
        // Instantiate new Post
        const post = new Post({
            title,
            author,
            content,
            cover_photo: path
        })

        // Save Post
        const newPost = await post.save()

        if (newPost) {
            // Return Created Post
            res.status(201).json(newPost)
        }
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
}

// @desc    Update a Post
// @route   PUT/PATCH /posts/:id
// access   Public
const updatePost = async (req, res) => {
    // Check if req.body exists
    if (!req.body) {
        res.status(400).json({ error: 'No request body'})
    }

    const { id } = req.params

    // Get the fields from req.body
    const { title, author, content } = req.body

    // Optionally check if req.file exists 
    const path = req.file?.path ?? null

    try {
        const originalPost = await Post.findById(id);

        if (!originalPost) {
            res.status(404).json({ 'error': 'Post not found '})
        }
        
        // Only delete Previous Cover Photo if there's a newly uploaded file
        if (originalPost.cover_photo && path) {
            deleteFile(originalPost.cover_photo)
        }

        // Update the fields of the original Document
        originalPost.title = title
        originalPost.author = author
        originalPost.content = content 
        originalPost.cover_photo = path

        // Save Post
        const updatedPost = await originalPost.save()

        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
}

// @desc    Show specified Post
// @route   GET /posts/:id
// access   Public
const showPost = async (req,res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)

        if (!post) {
            res.status(404).json({ 'error': 'Post not found '})
        }

        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json({ 'error': 'Post not found '})
    }
}

// @desc    Delete specified Post
// @route   DEL /posts/:id
// access   Public
const deletePost = async (req,res) => {
    try {
        const { id } = req.params

        const post = await Post.findByIdAndDelete(id)

        if (!post) {
            res.status(404).json({ 'error': 'Post not found '})
        }

        res.status(200).json({message: 'Successfully deleted post!'})
    } catch (error) {
        console.log(error)
        res.status(404).json({ 'error': 'Post not found '})
    }
}

module.exports = {
    getAllPosts,
    createPost,
    showPost,
    updatePost,
    deletePost
}