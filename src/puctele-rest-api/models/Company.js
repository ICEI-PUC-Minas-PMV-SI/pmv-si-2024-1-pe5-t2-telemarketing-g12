const { DataTypes } = require('sequelize');
const { parseParams } = require('./utils');

const CompanyModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
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
    this.model = sequelize.define('company', CompanyModel);
  },

  createCompany: (company) => {
    return this.model.create(company);
  },

  findCompany: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateCompany: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllCompanys: (params) => {
    const { query, limit, offset } = parseParams(params);
    return this.model.findAndCountAll({
      order: [['id', 'ASC']],
      where: query,
      limit,
      offset,
    });
  },

  deleteCompany: (query) => {
    const companyDeleted = {
      name: '################',
      email: '################',
      phone: '################',
      cnpj: '################',
      cep: '################',
      address: '################',
      number: 0,
      district: '################',
      city: '################',
      state: '################',
    };
    return this.model.update(companyDeleted, {
      where: query,
    });
  },
};
