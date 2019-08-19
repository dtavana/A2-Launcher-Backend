const router = require('express').Router();
const controller = require('../../controllers/servers.controller');

router.use('/', controller.getServers);

module.exports = router;