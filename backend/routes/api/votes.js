const { requireAuth } = require('../../utils/auth');

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

// TODO  not sure if this is updating votes properly
// TODO uncomment requireAuth to ensure you can only update votes if it is your vote
router.put(
  '/update',
  // requireAuth,
  asyncHandler(async (req, res) => {
    // const { id, details } = req.body;
    const { userId, songId, newVote } = req.body;
    const vote = await Vote.update(
      { vote: newVote },
      {
        where: { userId, songId },
        returning: true,
        plain: true,
      }
    );
    console.log(vote);
    res.json(vote);
  })
);

module.exports = router;
