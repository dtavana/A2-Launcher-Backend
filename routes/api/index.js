const router = require('express').Router();
router.use('/servers', require('./servers'));
module.exports = router;