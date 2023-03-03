const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { Vote } = require('../../db/models');

router.get(
  '/songs/:songId',
  asyncHandler(async (req, res) => {
    const { songId } = req.params;
    const votes = await Vote.findAll({
      where: {
        songId,
      },
    });
    res.json(votes);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id, details } = req.body;
    const vote = await Vote.update(details, {
      where: { id },
      returning: true,
      plain: true,
    });
    res.json(vote);
  })
);

module.exports = router;
