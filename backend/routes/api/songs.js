const router = require('express').Router(),
  asyncHandler = require('express-async-handler'),
  { Song } = require('../../db/models');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params,
      song = await Song.findByPk(id);

    res.json(song);
  })
);

module.exports = router;
