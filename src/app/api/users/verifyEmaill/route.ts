import {connect} from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { setCorsHeaders } from "@/corsMiddleware/corsMiddleware";

connect()

export async function POST(request: NextRequest){
    const res = NextResponse.next();
    const preflight = setCorsHeaders(request, res);
  
    if (preflight) {
      return res; // Return early if it's a preflight request
    }
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}