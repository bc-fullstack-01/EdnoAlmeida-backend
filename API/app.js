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
const swaggerJsdoc = require('swagger-jsdoc');
const pubsub = require("./libs/pubsub")


// Variables
const ACCESS_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "thisismytoken"
const morganLogPath = fs.createWriteStream(path.join(__dirname, 'Logs/access.log'), { flags: 'a' })


// Files import
const { Connection } = require("./models")
const { User: UserModel } = require("./models")
const { Post, Comment, User } = require("./routers");


// instanciate express
const app = express();

// Documentation
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SysMap Social App',
            version: '1.0.0',
        },
    },
    apis: ['./routers/*.js', './models/*.js'],
};
const openapiSpecification = swaggerJsdoc(options);//https://github.com/Surnet/swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
    explorer: true
}));


// Middware
app.use(cors())
// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(process.env.DEV || "dev", { stream: morganLogPath }));
app.use(express.static(path.join(__dirname, "public")))


// Authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorrization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(createError(401))
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(createError(403))
        UserModel.findOne(decoded.userId)
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => next(err))
    })
}



// Routers
app.use(pubsub.pub)
app.use("/v1/user", User)
app.use("/v1/comment", authenticateToken, Comment);
app.use("/v1/posts", authenticateToken, Post);



// Erro Middware
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