const express = require('express'),
  router = express.Router(),
  apiRouter = require('./api');

// namespace the backend routes under api
router.use('/api', apiRouter);

module.exports = router;
