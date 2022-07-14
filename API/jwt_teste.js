var jwt = require('jsonwebtoken');

// layload = Dados para reconhecimento de uma key
// sing = assinatura criptografada


const privateKey = 'teste'


var token = jwt.sign({ userId: '5' }, privateKey, { expiresIn: 300 });

function JsonWebTokenError(err, decoded) {
    if (err) return console.log('Token Invalido!')
    console.log(use)
    // console.log(decoded.userId)

}
console.log(token)

jwt.verify(token, privateKey, JsonWebTokenError)

