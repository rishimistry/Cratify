import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/Admin';

export async function GET(request: NextRequest) {
  try {
    // Get current user from session
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    // Get full user data from database
    const userData = await User.findById(user.id);
    
    if (!userData) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data without sensitive fields
    return NextResponse.json({
      user: {
        id: userData._id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: userData.role
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get current user from session
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get request body
    const { firstName, lastName, email, phone } = await request.json();
    
    await connectDB();
    
    // Find the user
    const userData = await User.findById(user.id);
    
    if (!userData) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if email is being changed and if it already exists
    if (email && email !== userData.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: user.id } });
      if (emailExists) {
        return NextResponse.json(
          { message: 'Email already in use' },
          { status: 409 }
        );
      }
    }
    
    // Update user data
    userData.firstName = firstName || userData.firstName;
    userData.lastName = lastName || userData.lastName;
    userData.email = email || userData.email;
    userData.phone = phone || userData.phone;
    
    // Save updated user
    await userData.save();
    
    // Return updated user data
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: userData._id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: userData.role
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating user profile' },
      { status: 500 }
    );
  }
} 