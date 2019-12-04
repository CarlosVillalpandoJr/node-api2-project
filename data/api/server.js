const express = require('express')

// Import Router Files
const PostsRouter = require('../posts-router');

const server = express();

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Posts API</h2>
    `)
})

server.use('/api/posts', PostsRouter)

module.exports = server;