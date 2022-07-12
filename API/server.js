
import https from 'https'

const app = require('./app')

const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/selfsigned.crt'))
}

const PORT = process.env.PORT || 3000

const server = https.createServer(options, app)

server.listen(PORT, () => {
    console.log('server listen in https://0.0.0.0:3000')
})


//app.listen(PORT, HOST)