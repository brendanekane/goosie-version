'use strict';

const { Show, Vote, Song } = require('../models');

const songVotes = [
  { vote: 1 },
  { vote: 1 },
  { vote: 0 },
  { vote: 0 },
  { vote: -1 },
  { vote: -1 },
  { vote: 1 },
  { vote: -1 },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const show = await Show.findOne({
      where: { date: '2022-02-09' },
      include: Song,
    });

    const songs = show.Songs;

    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      for (let j = 0; j < songVotes.length; j++) {
        const vote = songVotes[j].vote;
        const newVote = await Vote.create({
          songId: song.id,
          userId: 1,
          vote: vote,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const show = await Show.findOne({
      where: { date: '2022-02-09' },
      include: Song,
    });

    const songs = show.Songs;

    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      for (let j = 0; j < songVotes.length; j++) {
        const vote = songVotes[j].vote;
        await Vote.destroy({
          where: {
            songId: song.id,
            userId: 1,
            vote,
          },
        });
      }
    }
  },
};
