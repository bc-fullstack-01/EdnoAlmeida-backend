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
    console.error(`Mongo not connected ${JSON.stringify(args)}`);
});
mongoose.connection.on("connected", () => {
    console.warn(`Mongo connected ${JSON.stringify(args)}`);
});
mongoose.connection.on("disconnected", () => {
    console.error(`Mongo disconnected ${JSON.stringify(args)}`);
});

exports.Post = require("./post.js");
exports.Comments = require("./comments.js")
exports.User = require("./user.js")

exports.Connection = connect;
