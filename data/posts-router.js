const express = require('express');

const Posts = require('./db');

const router = express.Routes();

router.use(express.json());





module.exports = router;