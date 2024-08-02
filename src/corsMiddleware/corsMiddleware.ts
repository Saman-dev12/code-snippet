// middleware/corsMiddleware.ts
import { NextRequest, NextResponse } from "next/server";

export function setCorsHeaders(req: NextRequest, res: NextResponse) {
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  res.headers.set('Access-Control-Allow-Origin', 'https://your-allowed-origin.com'); // Replace with your allowed origin
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 });
  }

  return false;
}
