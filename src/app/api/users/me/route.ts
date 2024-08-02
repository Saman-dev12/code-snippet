import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connect } from "@/config/db";
import { setCorsHeaders } from "@/corsMiddleware/corsMiddleware";

connect();

export async function GET(request:NextRequest){
    const res = NextResponse.next();
    const preflight = setCorsHeaders(request, res);
  
    if (preflight) {
      return res; // Return early if it's a preflight request
    }
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}