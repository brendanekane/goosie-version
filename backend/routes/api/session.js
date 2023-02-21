const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { check } = require('express-validator'),
  { setTokenCookie, restoreUser } = require('../../utils/auth'),
  { handleValidationErrors } = require('../../utils/validation'),
  { User } = require('../../db/models');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
  handleValidationErrors,
];

router.get('/', restoreUser, (req, res) => {
  const { user } = req;

  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json();
});

router.post(
  '/',
  validateLogin,
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

    return res.json(user);
  })
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

module.exports = router;
