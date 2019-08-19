const router = require('express').Router();
const express = require('express')

router.use('/api', require('./api'));

module.exports = router;