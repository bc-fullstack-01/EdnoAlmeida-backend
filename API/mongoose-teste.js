const mongoose = require('mongoose');

const options = {
    dbName: 'main',
    connectTimeoutMS: 1000,
  };

const connect = mongoose.connect('mongodb://localhost:27017', options)

mongoose.connection.on("error", () => {
    console.error(`Mongo not connected `);
});
mongoose.connection.on("connected", () => {
    console.warn(`Mongo connected `);
});
mongoose.connection.on("disconnected", () => {
    console.error(`Mongo disconnected `);
});



// collections = tables = Schema mongoose
// documento = rows

const Animal = mongoose.model('Animal', { name: String }, 'Animal');

const kitty = new Animal({ name: 'gato' });
kitty.save()

const kittens = Animal.find();


// // Adicionando um método a um Schema
// Animal.methods.findSimilarTypes = function (cb) {
//     return mongoose.model('Animal').find({ type: this.type }, cb);
// };

// const dog = new Animal({ type: 'dog' });
// dog.findSimilarTypes((err, dogs) => {
//     console.log(dogs); // woof
// });