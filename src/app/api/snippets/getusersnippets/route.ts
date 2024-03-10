import { getDataFromToken } from "@/helpers/getDataFromToken";
import SnippetModel from "@/models/Snippet.model";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request:NextRequest){
    try{
    const userId = await getDataFromToken(request);
    if(!userId){
        return NextResponse.json({message:"Unauthorized"},{status:404})
    }
    const savedSnippets = await SnippetModel.find({userId});
    // console.log(savedSnippets);
    
    return NextResponse.json(savedSnippets)
}
catch(error:any){
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}