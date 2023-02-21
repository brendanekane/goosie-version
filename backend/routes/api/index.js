const router = require('express').Router(),
  sessionRouter = require('./session'),
  usersRouter = require('./users');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
