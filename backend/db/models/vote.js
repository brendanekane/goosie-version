'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    'Vote',
    {
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: {
            args: [1],
            msg: 'Must be -1, 0, or 1',
          },
          min: {
            args: [-1],
            msg: 'Must be -1, 0, or 1',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Vote',
    }
  );
  Vote.associate = function (models) {
    Vote.belongsTo(models.Song, { foreignKey: 'songId' });
    Vote.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Vote;
};
