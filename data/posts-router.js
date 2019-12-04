const express = require('express');

const Posts = require('./db');

const router = express.Router();

// Should not have to use this since it's in server.js
router.use(express.json());

// CRUD operations
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved" })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved" })
        })
})

// db.js method: findPostComments()
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if(comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved" })
        })
})

router.post('/', (req, res) => {
    const postBody = req.body;
    if (postBody.title && postBody.contents) {
        Posts.insert(postBody)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    } else {
        res.status(400).json({ errorMessage: "Provide title and contents for the post" })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
        .then(id => {
            if(id) {
                res.status(200)
                    .json({ message: "Post removed" })
            } else {
                res.status(404)
                    .json({ message: "Post with ID not found" })
            }
        })
        .catch(error => {
            res.status(500)
                .json({ error: "Post could not be removed"})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postBody = req.body;
    if (postBody.title && postBody.contents) {
        Posts.update(id, postBody)
            .then(id => {
                if(id) {
                    res.status(200).json({ postBody })
                } else {
                    res.status(404)
                    .json({ message: "Post with ID not found" })
                }
            })
            .catch(error => {
                res.status(500)
                    .json({ error: "Post info could not be modified" })
            })
    } else {
        res.status(400)
            .json({ errorMessage: "Provide title and content" })
    }
})



module.exports = router;