const { DataTypes } = require('sequelize');
const { parseParams } = require('./utils');

const ClientModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define('client', ClientModel);
  },

  createClient: (client) => {
    return this.model.create(client);
  },

  findClient: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateClient: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllClients: (params) => {
    const { query, limit, offset } = parseParams(params);
    return this.model.findAndCountAll({
      order: [['id', 'ASC']],
      where: query,
      limit,
      offset,
    });
  },

  deleteClient: (query) => {
    const clientDeleted = {
      name: '################',
      cpf: '################',
      birthDate: '################',
      email: '################',
      cep: '################',
      address: '################',
      number: 0,
      district: '################',
      city: '################',
      state: '################',
      phone: '################',
    };
    return this.model.update(clientDeleted,{
      where: query,
    });
  },
};
