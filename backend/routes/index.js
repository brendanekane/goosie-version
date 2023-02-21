const express = require('express'),
  router = express.Router(),
  apiRouter = require('./api');

// namespace the backend routes under api
router.use('/api', apiRouter);

router.get('/hello/world', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
