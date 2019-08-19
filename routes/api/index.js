const router = require('express').Router();

router.use('/servers', require('./servers'));
router.use('/serverinfo', require('./serverinfo'));

module.exports = router;