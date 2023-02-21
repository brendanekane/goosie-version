const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { setTokenCookie, restoreUser } = require('../../utils/auth'),
  { User } = require('../../db/models');

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    console.log(User, 'hello');
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login Failed');
      err.status = 401;
      err.title = 'Login Failed';
      err.errors = ['the provided credentials were invalid'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

module.exports = router;
