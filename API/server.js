const jwt = require("jsonwebtoken")

const app = require('./app')
// const server = require('http').Server(app)
// const io = require("socket.io")(server, { cors: { origin: "*" } })

const { User } = require("./models")
const pubsub = require("./libs/pubsub");
const RabbitmqServer = require("./libs/rabbitmq");



// variables
require("dotenv").config()
const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "thisismytoken"
const PORT = process.env.PORT || 3000
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.key')),
//     cert: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.crt'))
// }


// //  //functions for Websocket
// const liveData = io.of("/v1")

// //verificando se o socket tem a chave jwt valida
// // adicionando o perfil do usuário encontrado no socket
// liveData.use((socket, next) => {
//     if (socket.handshake.auth) {
//         const token = socket.handshake.auth.token
//         jwt.verify(token, ACCES_TOKEN_SECRET, (err, user) => {
//             if (err) next(new Error("Authentication error"))
//             User.findOne({ user }).populate("profile")
//                 .then(u => {
//                     socket.profile = u.profile
//                     next()
//                 })
//                 .catch(() => next(new Error("Authentication error")))
//         })
//     } else {
//         next(new Error("Authentication error"))
//     }
// })

// // recebendo as mensagens do sockets
// liveData.on("connection", socket => {
//     console.warn(`Server rodando ${socket.profile.name}`)

//     socket.on("disconnect", () => {
//         console.log(socket.connected)
//     })

//     socket.on("error", err => {
//         console.error(err)
//     })

//     socket.emit("connect_profile", socket.profile)
// })

// recebendo as mensagens do Rabbitmq
// pubsub.sub().then(subscription => {
//     subscription.on("message", (message, content, ackOrNack) => {
//         ackOrNack()
//         Object.entries(Object.fromEntries(liveData.sockets))
//             .filter(([, socket]) =>
//                 content.keys.includes(socket.profile.id.toString()))
//             .map(([k, s]) => {

//                 return s.emit(content.type, content.value)
//             })
//     })
// }).catch(console.error)


// recebendo as mensagens do Rabbitmq
const consumer = async () => {
    try {
        var rabit_server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672')
        rabit_server.start()
        rabit_server.consume('fila_nome', (message) => console.log(message.content.toString()))
    } catch(err){
        console.log('Erro no consumo da file rabbit', err)
    }
}

consumer();


// // server express
var server = app

// // server https
// const server = https.createServer(options, app)


server.listen(process.env.PORT || 3000, () => console.log('server listen in https://0.0.0.0:3000'));
