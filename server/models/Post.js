const mongoose = require("mongoose")

const Schema = mongoose.Schema   //Database, each post will have the following
const PostSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    },
    updatedAt: {
        type: Date, 
        default: Date.now 
    },  
})

module.exports = mongoose.model("Post", PostSchema)