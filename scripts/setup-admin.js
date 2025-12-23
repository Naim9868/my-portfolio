
// Try running the script with the URI directly (temporarily):
// MONGODB_URI="mongodb://localhost:27017/portfolio-admin" node scripts/setup-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Check if any user exists
    const existingUser = await db.collection('users').findOne({});
    
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('rowja2020', salt);

    // Create admin user
    await db.collection('users').insertOne({
      username: 'Rowja',
      password: hashedPassword,
      email: 'afiyakhaoyatin@gmail.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

setupAdmin();