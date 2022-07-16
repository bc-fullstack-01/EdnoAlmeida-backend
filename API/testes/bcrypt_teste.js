const bcrypt = require('bcrypt');


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const hash = bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash_) {
        console.log(hash_)
        return hash_
    });
});


bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    console.log(result)
});

console.log(bcrypt.compareSync('s0/\/\P4$$w0rD', hash))