import { setCorsHeaders } from "@/corsMiddleware/corsMiddleware";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    const res = NextResponse.next();
    const preflight = setCorsHeaders(request, res);
  
    if (preflight) {
      return res; // Return early if it's a preflight request
    }
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0)
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }
