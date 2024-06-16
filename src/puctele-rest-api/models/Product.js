const { DataTypes } = require('sequelize');
const { parseParams } = require('./utils');

const ProductModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'companies',
      key: 'id',
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define('product', ProductModel);
  },

  createProduct: (product) => {
    return this.model.create(product);
  },

  findProduct: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateProduct: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllProducts: (params) => {
    const { query, limit, offset } = parseParams(params);
    return this.model.findAndCountAll({
      order: [['id', 'ASC']],
      where: query,
      limit,
      offset,
    });
  },

  deleteProduct: (query) => {
    const productDeleted = {
      product: "###############",
      companyId: 0,
      password: "####################",
      phone: "###############",
      contactName: "###############",
    }
    return this.model.update(productDeleted,{
      where: query,
    });
  },
};
