const express = require("express");
const createError = require("http-errors");

const { Connection, Post, Comments } = require("../models");


const router = express.Router();

router
    .param('postId', (req, res, next, id) => Promise.resolve()
        .then(() => {
            res.locals.post = { id }
            next()
        })
        .catch(err => next(err))
    )
    .route("/:postId/comments")
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => {
            next()
        })
        .catch(err => next(err))
    )
    .get((req, res, next) => Promise.resolve()
        .then(() => new Comments(Object.assign(req.body, { post: req.locals.post.id, user: req.user._id })).save())
        .then((comment) => Post.findById(comment.post)
            .then(post => Object.assign(post, { comments: [...post.comments, comment._id] }))
            .then(post => Post.findByIdAndUpdate(comment.post, post))
            .then(() => comment)
        )
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
    );

//@router POST/post/{postId}/comments


router
    .param('id', (req, res, next, id) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => {
            next()
        })
        .catch(err => next(err))
    )
    .post((req, res, next) => Promise.resolve()
        .then(() => new Comments(Object.assign(req.body, { post: req.params.post.id })).save())
        .then(data => Post.findByIdAndUpdate(data.post, { $push: { comments: data } }))
        .then(() => res.status(201).send({ message: "Created a Comment" }))
        .catch(err => next(err))
    )
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.findById(req.params.id).populate('post'))
        .then(data => data ? res.status(200).json(data) : next(createError(404)))
        .then(post => Post.findByIdAndUpdate(comment.post, post))
        .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        .then(() => Comment.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }))
        .then(data => res.status(203).json(data))
        .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        .then(() => Post.deleteOne(req.params.id))
        .then(data => res.status(203).json(data))
        .catch(err => next(err))
    )




module.exports = router;