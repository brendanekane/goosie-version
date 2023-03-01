'use strict';

const { Show, Song } = require('../models');

const show1Songs = [
  {
    title: 'Drive',
    notes: 'set 1 opener',
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
    notes: 'set 2 opener',
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

const show2Songs = [
  {
    title: 'Earthling or Alien?',
    notes: 'set 1 opener',
  },
  {
    title: 'Caution',
    notes: 'Bob Marley cover',
  },
  {
    title: 'The Whales',
    notes: '',
  },
  {
    title: 'Rosewood Heart',
    notes: '',
  },
  {
    title: "The Old Man's Boat",
    notes: 'set 1 closer',
  },
  {
    title: 'Yeti',
    notes: 'set 2 opener',
  },
  {
    title: 'AUATC',
    notes: 'Bon Iver cover',
  },
  {
    title: 'Arrow',
    notes: 'Arise',
  },
  {
    title: 'Arcadia',
    notes: 'set 2 closer',
  },
  {
    title: 'Disco Inferno',
    notes: 'The Trammps cover, encore',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < show1Songs.length; i++) {
      const show = await Show.findOne({
          where: { date: '2022-02-09' },
          include: Song,
        }),
        song = show1Songs[i];
      await Song.create({
        title: song.title,
        showId: show.id,
        notes: song.notes,
      });
    }
    for (let i = 0; i < show2Songs.length; i++) {
      const show = await Show.findOne({
          where: { date: '2022-02-10' },
          include: Song,
        }),
        song = show2Songs[i];
      await Song.create({
        title: song.title,
        showId: show.id,
        notes: song.notes,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let i = 0; i < show1Songs.length; i++) {
      const show = await Show.findOne({ where: { date: '2022-02-09' } }),
        song = show1Songs[i];
      await Song.destroy({
        where: {
          title: song.title,
          showId: show.id,
          notes: song.notes,
        },
      });
    }
    for (let i = 0; i < show2Songs.length; i++) {
      const show = await Show.findOne({ where: { date: '2022-02-10' } }),
        song = show2Songs[i];
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
