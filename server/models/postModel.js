const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add a title']
    },
    author: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Please add a content']
    },
    cover_photo:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', postSchema)