const router = require('express').Router();
const controller = require('../../../controllers/servers.controller');

router.get('/', controller.getServerInfo);

module.exports = router;