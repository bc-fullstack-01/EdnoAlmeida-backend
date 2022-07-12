const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    description: {
        type: String,
        required: [true, "Comment content can't be empty"],
        minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
    },
});


module.exports = model("Comment", commentSchema)