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
        .catch(err => next(err))
    )
    .post((req, res, next) => Promise.resolve()
        .then(() => new Post(req.body).save())
        .then(() => {
            res.status(201).send({ message: "Created a Post" })
        })
        .catch(err => next(err))
    )

router
    .route("/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.findById(req.params.id))
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndDelete(req.params.id))
        .then(() => Comments.find({ post: req.params.id }))
        .then(comments => comments.forEach(comment => {
            comment.delete()
        }))
        .then(() => {
            res.status(200).send({ message: "Successfully Deleted" })
        })
        .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        }))
        .then(() => {
            res.status(200).send({ message: "Updated a Post" })
        })
        .catch(err => next(err))
    );
module.exports = router;