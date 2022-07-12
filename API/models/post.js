const { Schema, model } = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "No empty posts allowed"],
        minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
    },
    description: {
        type: String,
        required: [true, "Post content can't be empty"],
        minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});


module.exports = model("Post", postSchema);;