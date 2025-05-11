import { NextRequest, NextResponse } from 'next/server';
import { clearSessions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Clear all session cookies
    await clearSessions();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
} 