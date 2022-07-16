const app = require("./app.js");
const http = require("http")
const socketio = require("socket.io")
const jwt = require("jsonwebtoken")
const {User} = require("./model")
const notificationPubSub = require("./rabbit/notificationPubSub");

require("dotenv").config()

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "thisismytoken"
const server = http.Server(app)
const io = socketio(server, {cors:{origin: "*"}})

const liveData = io.of("/")

liveData.use((socket, next) =>{
    if (socket.handshake.auth){
        const token = socket.handshake.auth.token
        jwt.verify(token, ACCES_TOKEN_SECRET, (err, user) =>{
            if(err)  next(new Error("Authentication error"))
            User.findOne({user}).populate("profile")
            .then(u =>{
                socket.profile = u.profile
                next()
            })
            .catch(() => next(new Error("Authentication error")))
        })
    }else{
        next(new Error("Authentication error"))
    }
})

liveData.on("connection", socket =>{
    console.warn(`Server rodando ${socket.profile.name}`)
    socket.on("disconnect", () => {
        console.log(socket.connected)
    })
    socket.on("error", err =>{
        console.error(err)
    })
    socket.emit("connect_profile", socket.profile)
})

const consumer = notificationPubSub.sub
consumer().then(sub=>{
    sub.on("message", (message, content, ackOrNack) =>{ 
        ackOrNack()
        Object.entries(Object.fromEntries(liveData.sockets))
            .filter(([,socket]) => 
                content.keys.includes(socket.profile.id.toString()))
            .map(([k,s]) => {
                
                return s.emit(content.type, content.value)
            })
    })
}).catch(console.error)

server.listen(process.env.PORT || 3000, () => console.log("http://localhost:3000"));