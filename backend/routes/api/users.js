const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { setTokenCookie, requireAuth } = require('../../utils/auth'),
  { User } = require('../../db/models');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.signup({ username, email, password });

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

module.exports = router;
