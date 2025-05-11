import { createHash } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from './mongodb';
import User from '../models/Admin';

// Simple password hashing function
export const hashPassword = (password: string) => {
  return createHash('sha256').update(password).digest('hex');
};

// Validate user credentials
export async function validateAdminCredentials(username: string, password: string) {
  await connectDB();
  
  const admin = await User.findOne({ username, role: 'admin' });
  
  if (!admin) {
    return false;
  }
  
  return await validateCredentials(password, admin.password);
}

// Validate password
export async function validateCredentials(password: string, hashedPassword: string) {
  const hashedInput = hashPassword(password);
  return hashedInput === hashedPassword;
}

// Set user session cookie
export async function setUserSession(user: {
  id: string;
  username: string;
  email: string;
  role: string;
}) {
  const cookieStore = cookies();
  await cookieStore.set('user-session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

// Set admin session cookie (for backward compatibility)
export async function setAdminSession() {
  const cookieStore = cookies();
  await cookieStore.set('admin-session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
}

// Clear all session cookies
export async function clearSessions() {
  const cookieStore = cookies();
  await cookieStore.delete('user-session');
  await cookieStore.delete('admin-session');
}

// Clear admin session cookie (for backward compatibility)
export async function clearAdminSession() {
  const cookieStore = cookies();
  await cookieStore.delete('admin-session');
}

// Get current user from session
export async function getCurrentUser() {
  const cookieStore = cookies();
  const hasSession = await cookieStore.has('user-session');
  
  if (!hasSession) {
    return null;
  }
  
  const sessionCookie = await cookieStore.get('user-session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  
  try {
    return JSON.parse(sessionCookie.value);
  } catch (error) {
    console.error('Error parsing user session:', error);
    return null;
  }
}

// Check if user is authenticated
export async function isUserAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// Check if admin is authenticated
export async function isAdminAuthenticated() {
  const user = await getCurrentUser();
  
  // Check new user-session first
  if (user && user.role === 'admin') {
    return true;
  }
  
  // Fallback to legacy admin-session
  const cookieStore = cookies();
  const hasLegacySession = await cookieStore.has('admin-session');
  return hasLegacySession;
}

// Middleware to protect user routes
export async function protectUserRoute() {
  if (!(await isUserAuthenticated())) {
    redirect('/login');
  }
}

// Middleware to protect admin routes
export async function protectAdminRoute() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
} 