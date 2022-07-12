const express = require("express");
const { Post, Comments } = require("../model")

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.find({}))
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => next(err)))
    .post((req, res, next) => Promise.resolve()
        .then(() => new Post(req.body).save())
        .then(() => {
            res.status(201).send({ message: "Created a Post" })
        })
        .catch(err => next(err)))
