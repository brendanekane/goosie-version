const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { setTokenCookie } = require('../../utils/auth.js'),
  { User } = require('../../db/models'),
  { restoreUser } = require('../../utils/auth.js');

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition',
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get('/test', (req, res) => {
  res.send('hey from api/test');
});

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
