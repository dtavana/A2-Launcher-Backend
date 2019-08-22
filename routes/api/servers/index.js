const router = require('express').Router();
const controller = require('../../../controllers/servers.controller');

router.get('/', controller.getServers);
router.use('/serverinfo', require('./serverinfo'));

module.exports = router;