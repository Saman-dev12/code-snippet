import { getDataFromToken } from "@/helpers/getDataFromToken";
import SnippetModel from "@/models/Snippet.model";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request:NextRequest,context:any){
    try{
    const userId = await getDataFromToken(request);
    if(!userId){
        return NextResponse.json({message:"Unauthorized"},{status:404})
    }
    const {params} = context;
    const snippetId = params.id;
    // console.log(snippetId);
    
    const snip = await SnippetModel.findOne({_id:snippetId});
    // console.log(snip);
    

    return NextResponse.json({data:snip},{status:200})
}
catch(error:any){
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}