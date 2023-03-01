const router = require('express').Router(),
  sessionRouter = require('./session'),
  usersRouter = require('./users'),
  showsRouter = require('./shows');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/shows', showsRouter);

module.exports = router;
