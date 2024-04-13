const Post = require('../models/postModel');
const deleteFile = require('../utils/deleteFile')
//create


//read
//@desc Get All Posts
//@route GET /posts
//access Public 

const createPost = async (req, res)  => {
    //Validate if req.body exists
    if(!req.body){
        res.status(404).json({error: 'No request body'})
    }

    const{title, author, content} = req.body
    //const{path} = req.file

    const path = req.file?.path ?? null

    try{
        const post = new Post({
            title,
            author,
            content,
            cover_photo: path
        })

        const newPost = await post.save()

        if(newPost){
            //201 kasi may nagawa
            res.status(201).json(newPost)
        }
    }catch(error){
        console.log(error)
        res.status(422).json(error)
    }
}

//get all posts
const getAllPosts = async (req, res) =>{
    //anything async use try catch
    try{
        const posts = await Post.find()  //when find is empty, it will return everything
        res.json(posts)
    } catch(e){
        console.log(e);
    }
}

//update

const updatePost = async (req, res)  => {
    //Validate if req.body exists
    if(!req.body){
        res.status(400).json({error: 'No request body'})
    }

    const{id} = req.params
    const{title, author, content} = req.body

    //optionally check if req.file exists
    const path = req.file?.path ?? null

    try{
       //find the Post
       const originalPost = await Post.findById(id)
       //validate if there is no post, return
        if(!originalPost){
            return res.status(404).json({error: 'Original Post Not Found'})
        }

       // handle deleting of the previous photo
       if(originalPost.cover_photo && path){
            deleteFile(originalPost.cover_photo)
       }
        //only delete the prev photo if there is an existing photo
       //update the fields of the original post
        originalPost.title = title;
        originalPost.author = author;
        originalPost.content = content;
        originalPost.cover_photo = path;

       //save post
        const updatedPost = await originalPost.save();
       //return
       res.status(200).json(updatedPost)
    }catch(error){
        console.log(error)
        res.status(422).json(error)
    }
}


const showPost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)

        if (!post) {
          // If post is null, throw an error
            throw new Error('Post not found')
        }

        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'Post not found' })
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost
}

//delete

const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findByIdAndDelete(id)

        if (!post) {
            return res.status(404).json({ error: 'Post Not Found' })
        }

        res.json(post)

        if(post.cover_photo){
            deleteFile(post.cover_photo)
        }

        res.status(200).json({ message: 'Successfully deleted post!' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'Post Not Found' })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    showPost,
    updatePost,
    deletePost,
}