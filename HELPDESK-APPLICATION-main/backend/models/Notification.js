const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  },

  ticketId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Tickets',
      key: 'id'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM(
      'ticket_created',
      'ticket_assigned',
      'ticket_updated',
      'ticket_resolved',
      'new_ticket'
    ),
    allowNull: false
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'Notifications',
  timestamps: true
});

module.exports = Notification;