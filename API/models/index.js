const moongose = require("mongoose");

const connect = moongose.connect(
    `${(process.env.MONGODB || 'mongodb://localhost:27017/mydb')}_${process.env.NODE_ENV || 'developement'}`);


moongose.connection.on("error", () => {
    console.error(`Mongo not connected ${JSON.stringify(args)}`);
});
moongose.connection.on("connected", () => {
    console.warn(`Mongo connected ${JSON.stringify(args)}`);
});
moongose.connection.on("disconnected", () => {
    console.error(`Mongo disconnected ${JSON.stringify(args)}`);
});

exports.Post = require("./Post.js");
exports.Comments = require("./Comments.js")
exports.User = require("./user.js")

exports.Connection = connect;
