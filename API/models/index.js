const mongoose = require("mongoose");


const options = {
    dbName: 'main',
    connectTimeoutMS: 1000,
};

const connect = mongoose.connect(
    `${(process.env.MONGODB || 'mongodb://localhost:27017')}`,
    options,
)

console.log(mongoose.connection.readyState);

mongoose.connection.on("error", () => {
    console.error(`Mongo not connected!`);
});
mongoose.connection.on("connected", () => {
    console.warn(`Mongo connected!`);
});
mongoose.connection.on("disconnected", () => {
    console.error(`Mongo disconnected!`);
});

exports.Post = require("./post.js");
exports.Comments = require("./comment.js")
exports.User = require("./user.js")

exports.Connection = connect;
