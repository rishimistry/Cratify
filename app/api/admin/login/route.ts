import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, setAdminSession } from '@/lib/auth';
import { seedAdminUser } from '@/lib/seed';

// Ensure admin user exists
seedAdminUser().catch(err => console.error('Error seeding admin user:', err));

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

    // Validate credentials
    const isValid = await validateAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set session cookie
    await setAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 