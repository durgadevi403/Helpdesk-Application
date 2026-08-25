const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mimeType: {
    type: DataTypes.STRING,
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

uploadedById: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id'
  },
  onDelete: 'NO ACTION'
}, 
}, {
  tableName: 'attachments',
  timestamps: true
});

module.exports = Attachment;

