const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ticketId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'tickets',
    key: 'id'
  },
  onDelete: 'NO ACTION'
},
  userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id'
  },
  onDelete: 'NO ACTION'
},
  
  isInternal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'comments',
  timestamps: true
});

module.exports = Comment;

