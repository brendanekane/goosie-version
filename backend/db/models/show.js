'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    'Show',
    {
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 64],
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      name: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Show',
    }
  );
  Show.associate = function (models) {
    Show.hasMany(models.Song);
  };
  return Show;
};
