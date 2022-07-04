import express from 'express'
import cors from 'cors'
import routes from './routes'

import path from 'path'
import fs from 'fs'
import https from 'https'

var app = express()

const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.crt'))
}


app.use(cors())
app.use(routes)


const PORT = process.env.PORT || 3000

const server = https.createServer(options, app)

server.listen(PORT, () => {
    console.log('server listen in https://0.0.0.0:3000')
})


//app.listen(PORT, HOST)