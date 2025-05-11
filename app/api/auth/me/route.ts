import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ authenticated: false });
    }
    
    // Never return the password or sensitive info
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Error retrieving user' },
      { status: 500 }
    );
  }
} 