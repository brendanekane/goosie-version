'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    'Song',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 64],
        },
      },
      showId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: { type: DataTypes.STRING },
    },
    {
      sequelize,
    }
  );
  Song.associate = function (models) {
    Song.belongsTo(models.Show, { foreignKey: 'showId' });
    Song.hasMany(models.Vote, {
      foreignKey: 'songId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Song;
};
