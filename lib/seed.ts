import connectDB from './mongodb';
import User from '../models/Admin';
import { hashPassword } from './auth';

// Seed admin and regular users
export async function seedAdminUser() {
  try {
    await connectDB();
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin', role: 'admin' });
    
    if (!existingAdmin) {
      // Create default admin user
      await User.create({
        username: 'admin',
        email: 'admin@cratify.com',
        password: hashPassword('admin'),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      });
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists, skipping seed');
    }

    // Create a regular user for demo purposes
    const existingUser = await User.findOne({ username: 'user' });
    
    if (!existingUser) {
      await User.create({
        username: 'user',
        email: 'user@example.com',
        password: hashPassword('password'),
        firstName: 'Demo',
        lastName: 'User',
        role: 'user'
      });
      console.log('Demo user created successfully');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
} 