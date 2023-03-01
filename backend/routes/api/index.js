const router = require('express').Router(),
  sessionRouter = require('./session'),
  usersRouter = require('./users'),
  showsRouter = require('./shows');
votesRouter = require('./votes');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/shows', showsRouter);

router.use('/votes', votesRouter);

module.exports = router;
