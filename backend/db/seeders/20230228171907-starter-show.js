'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Shows',
      [
        {
          venue: 'First Avenue',
          location: 'Minneapolis, MN',
          date: '2022-02-09',
        },
        {
          venue: 'The Sylvee',
          location: 'Madison, WI',
          date: '2022-02-10',
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Shows',
      {
        date: { [Op.in]: ['2022-02-09', '2022-02-10'] },
      },
      {}
    );
  },
};
