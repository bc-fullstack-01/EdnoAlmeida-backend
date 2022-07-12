const { Schema, model } = require("mongoose");

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Comment content can't be empty"],
        minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
});


module.exports = model("comment", commentSchema)