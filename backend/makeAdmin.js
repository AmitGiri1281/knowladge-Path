const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Make user with email 'admin@example.com' an admin
    const user = await User.findOneAndUpdate(
      { email: 'admin@example.com' },
      { 
        role: 'admin',
        isAdmin: true 
      },
      { new: true }
    );

    if (user) {
      console.log(`✅ User ${user.email} is now an admin!`);
      console.log('Role:', user.role);
      console.log('isAdmin:', user.isAdmin);
    } else {
      console.log('❌ User not found. Create user first or use different email.');
      
      // Create admin user if doesn't exist
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const newAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isAdmin: true
      });
      
      console.log('✅ Admin user created!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

makeAdmin();