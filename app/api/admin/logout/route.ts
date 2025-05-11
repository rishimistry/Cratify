import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Clear session cookie
    await clearAdminSession();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
} 