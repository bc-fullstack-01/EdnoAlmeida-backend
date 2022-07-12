const { Schema, model } = require('mongoose')
const { post } = require('../routers/comment')

/** 
* @typedef User
* @propetry {string} name.required
*/

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    user: {
        type: String,
        required: true,
        unique: true,
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        minLength: 2
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = model('User', postSchema)