const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


//---------------------------------------------------------------//

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase:true
    },
    body: {
        type: String,
        required: true,
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "author"
    },
    tags: [{
        type:String,
        lowercase:true
    }],
    category: {
        type: String,
        required: true,
        lowercase:true
    },
    subcategory: [{
        type:String,
        lowercase:true
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt : {
        type : Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt:{
        type : Date,
    }
}, { timestamps: true });


module.exports = mongoose.model('blog', blogSchema) 
