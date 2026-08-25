const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, initializeDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const adminRoutes = require('./routes/admin');
const managerRoutes = require('./routes/manager');
const superadminRoutes = require('./routes/superadmin');
const notificationRoutes = require('./routes/notifications');
const { initializeDefaultUsers, initializeDefaultSLAs } = require('./utils/seedData');
require('./utils/createUploadsDir'); // Ensure uploads directory exists

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Helpdesk API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

// Initialize database and start server
initializeDatabase()
  .then(() => {
    console.log('Authenticating with database...');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('[OK] Database connection established successfully.');
    console.log('Syncing database models...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('[OK] Database models synchronized.');
    return initializeDefaultUsers();
  })
  .then(() => {
    return initializeDefaultSLAs();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[SERVER] Server is running on port ${PORT}`);
      console.log(`[API] http://localhost:${PORT}/api`);
      console.log(`[DATABASE] ${process.env.DB_NAME || 'helpdesk_db'}`);
      console.log('');
      console.log('[CREDENTIALS] Default Login Accounts:');
      console.log('   SuperAdmin:  superadmin@helpdesk.com / superadmin123');
      console.log('   Admin:       admin@helpdesk.com / admin123');
      console.log('   Manager:     manager@helpdesk.com / manager123');
      console.log('');
    });
  })
  .catch((error) => {
  console.error('[ERROR] Unable to connect to the database:');
  console.error(error.message);

  if (error.parent?.errors) {
    console.error('SQL Server errors:');
    error.parent.errors.forEach((err, index) => {
      console.error(`Error ${index + 1}:`, err.message);
    });
  }

  process.exit(1);
});

module.exports = app;

