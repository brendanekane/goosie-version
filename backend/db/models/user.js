'use strict';
const { Validator } = require('sequelize'),
  bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(val) {
            if (Validator.isEmail(val)) {
              throw new Error('Cannot be an email');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    // if the below scope isn't set up right you will get an error
    // Cookie “token” has been rejected because it is already expired. as well as an error - Error: Invalid argument
    // make sure you have set up the scope properly
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'updatedAt', 'createdAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ['hashedPassword'],
          },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ username, email, hashedPassword });
    if (user) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.associate = function (models) {
    User.hasMany(models.Vote, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return User;
};
