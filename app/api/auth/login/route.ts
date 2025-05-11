import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, setUserSession } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate inputs
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user exists (either by username or email)
    const isEmail = username.includes('@');
    const query = isEmail ? { email: username } : { username };
    
    const user = await User.findOne(query);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Validate password
    const { password: storedPassword } = user;
    const isValid = await validateCredentials(password, storedPassword);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set session cookie with user info
    await setUserSession({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Return user info and role
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 