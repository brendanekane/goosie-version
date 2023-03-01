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

  Show.createShow = async function ({ venue, date, name }) {
    try {
      const show = await Show.create({ venue, date, name });
      if (show) {
        return await Show.findByPk(show.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  Show.associate = function (models) {
    Show.hasMany(models.Song, {
      foreignKey: 'showId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Show;
};
