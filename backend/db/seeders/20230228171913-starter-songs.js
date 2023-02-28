'use strict';

const { Show, Song } = require('../models');

const showSongs = [
  {
    title: 'Drive',
    notes: '',
  },
  {
    title: 'Gun Street Girl',
    notes: 'Tom Waits cover',
  },
  {
    title: 'Lead the Way',
    notes: '',
  },
  {
    title: 'Life on a Shelf',
    notes: '>',
  },
  {
    title: 'Electic Avenue',
    notes: 'Eddie Grant cover',
  },
  {
    title: 'Madhuvan',
    notes: 'set 1 closer',
  },
  {
    title: 'Bob Don',
    notes: '',
  },
  {
    title: 'Echo of a Rose',
    notes: '>',
  },
  {
    title: 'Spirit of the Dark Horse',
    notes: 'First time played with a new feel & new outro',
  },
  {
    title: 'Mississippi Half-Step Uptown Toodeloo',
    notes: 'Grateful Dead cover',
  },
  {
    title: 'Time to Flee',
    notes: 'set 2 closer',
  },
  {
    title: 'White Lights',
    notes: 'encore',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < showSongs.length; i++) {
      const show = await Show.findOne({
          where: { date: '2022-02-09' },
          include: Song,
        }),
        song = showSongs[i];
      await Song.create({
        title: song.title,
        showId: show.id,
        notes: song.notes,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let i = 0; i < showSongs.length; i++) {
      const show = await Show.findOne({ where: { date: '2022-02-09' } }),
        song = showSongs[i];
      await Song.destroy({
        where: {
          title: song.title,
          showId: show.id,
          notes: song.notes,
        },
      });
    }
  },
};
