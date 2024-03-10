import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken';
import User from './models/User.model';

interface ExtendedNextRequest extends NextRequest {
  user: typeof User;
}

export async function middleware(request: ExtendedNextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/dashboard';

  // Retrieve user information securely
  const currentUser = await getDataFromToken(request);
  const user = await User.findById(currentUser).select("-password");
  if (!user) {
    return NextResponse.json({error:"User not found"});
  }
  request.user = user;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/snippet',
    // Add API routes to the matcher
    '/api/snippets/makesnippet',
  ],
};
