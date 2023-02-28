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
      show_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Song',
    }
  );
  Song.associate = function (models) {
    Song.belongsTo(models.Show);
  };
  return Song;
};
