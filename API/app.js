const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const createError = require("http-errors");
const helmet = require("helmet");
const cors = require("cors")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const swaggerUi = require('swagger-ui-express');


// Variables
const ACCESS_TOKEN_SECRET = 'SDFSFSDFSDFSDdsfsdfds'
const swaggerDocument = require('./swagger.json')
const options = Object.assign(swaggerDocument, { basedir: __dirname })
const morganLogPath = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


// Files import
const { Connection } = require("./model")
const { User: UserModel } = require("./model")
const { Post, Comment, User } = require("./routers");


// instanciate express
const app = express();
// const expressSwagger = esg(app)
// expressSwagger(options)


// Middware
app.use(cors())
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(process.env.DEV || "dev"), { stream: accessLogStream });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// set logger
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorrization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(createError(401))
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(createError(403))
        UserModel.findOne({ user })
            .then(u => {
                req.user = u
                next()
            })
    })
}

// Routers
app.use("/v1/posts", authenticateToken, Comment);
app.use("/v1/posts", authenticateToken, Post);
app.use("/v1/user", User)



// Erro Middwares
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    if (err.name && err.name === "ValidationError") {
        res.status(406).json(error)
    }
    else if ((err.status === 404) || (err.name === "CastError")) {
        res.status(404).json({
            url: req.originalUrl,
            error: { message: 'Not found' }
        })
    } else if ((err.status === 11000) || (err.name === "CastError")) {
        res.status(404).json({
            url: req.originalUrl,
            error: { message: 'Duplicate key not allowed' }
        })
    } else {
        res.status(err.status || 500).json({
            url: req.originalUrl,
            error: { message: 'Not informed' }
        })
    }
})

module.exports = app;