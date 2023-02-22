const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { check } = require('express-validator'),
  { handleValidationErrors } = require('../../utils/validation'),
  { setTokenCookie, requireAuth } = require('../../utils/auth'),
  { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters'),
  check('username').not().isEmail().withMessage('Username cannot be an email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.signup({ username, email, password });

    await setTokenCookie(res, user);

    return res.json(user);
  })
);

module.exports = router;
