const { DataTypes } = require('sequelize');
const { parseParams } = require('./utils');

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define('user', UserModel);
  },

  createUser: (user) => {
    return this.model.create(user);
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (params) => {
    const { query, limit, offset } = parseParams(params);
    return this.model.findAndCountAll({
      order: [['id', 'ASC']],
      where: query,
      limit,
      offset,
    });
  },

  deleteUser: (query) => {
    const userDeleted = {
      username: "###############",
      email: "#####@########.###",
      password: "####################",
      firstName: "###############",
      lastName: "###############",
    }
    return this.model.update(userDeleted,{
      where: query,
    });
  },
};
