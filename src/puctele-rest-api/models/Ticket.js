const { DataTypes } = require('sequelize');
const { ticketType, ticketStatus, ticketPriority } = require('../config');
const { parseParams } = require('./utils');

const TicketModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ticketType.DEFAULT,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ticketStatus.OPEN,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ticketPriority.LOW,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define('ticket', TicketModel);
  },

  createTicket: (ticket) => {
    return this.model.create(ticket);
  },

  findTicket: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateTicket: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllTickets: (params) => {
    const { query, limit, offset } = parseParams(params);
    return this.model.findAndCountAll({
      order: [['id', 'ASC']],
      where: query,
      limit,
      offset,
    });
  },

  deleteTicket: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
