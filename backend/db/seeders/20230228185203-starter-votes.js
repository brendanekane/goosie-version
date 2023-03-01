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

const randomNumberHelper = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const show1 = await Show.findOne({
      where: { date: '2022-02-09' },
      include: Song,
    });

    const show2 = await Show.findOne({
      where: { date: '2022-02-10' },
      include: Song,
    });

    const songs1 = show1.Songs;
    const songs2 = show2.Songs;

    for (let i = 0; i < songs1.length; i++) {
      const song = songs1[i];
      for (let j = 0; j < 8; j++) {
        const vote = randomNumberHelper(-1, 1);
        const newVote = await Vote.create({
          songId: song.id,
          userId: 1,
          vote: vote,
        });
      }
    }

    for (let i = 0; i < songs2.length; i++) {
      const song = songs2[i];
      for (let j = 0; j < 8; j++) {
        const vote = randomNumberHelper(-1, 1);
        const newVote = await Vote.create({
          songId: song.id,
          userId: 1,
          vote: vote,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const show1 = await Show.findOne({
      where: { date: '2022-02-09' },
      include: Song,
    });
    const show2 = await Show.findOne({
      where: { date: '2022-02-10' },
      include: Song,
    });

    const songs1 = show1.Songs;
    const songs2 = show2.Songs;

    for (let i = 0; i < songs1.length; i++) {
      const song = songs1[i];
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

    for (let i = 0; i < songs2.length; i++) {
      const song = songs2[i];
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
