const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { Show } = require('../../db/models');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
  })
);

router.get(
  '/:id/songs',
  asyncHandler(async (req, res) => {
    const { id } = req.params,
      show = await Show.findByPk(id),
      songs = await show.getSongs();

    res.json(songs);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    console.log('hello');
    const { venue, date, name } = req.body;
    const show = await Show.createShow({ venue, date, name });

    return res.json(show);
  })
);

module.exports = router;
