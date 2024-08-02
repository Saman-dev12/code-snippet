import { setCorsHeaders } from "@/corsMiddleware/corsMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest,context:any) {
    const res = NextResponse.next();
  const preflight = setCorsHeaders(request, res);

  if (preflight) {
    return res; // Return early if it's a preflight request
  }

}