import { connect } from "@/config/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import SnippetModel from "@/models/Snippet.model";
import { type NextRequest, NextResponse } from "next/server";

connect()
export async function DELETE(request: NextRequest,context:any) {
    try {
     const userId = await getDataFromToken(request);
      if(!userId){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Use 401 for unauthorized access
      }
      
    const {params} = context;
    const snippetId = params.id;
    // console.log(snippetId);
    
    if (!snippetId) {
      return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
    }

    // Update the snippet in the database
     await SnippetModel.findByIdAndDelete(
      snippetId
    );
    
    // Return the updated snippet
    return NextResponse.json({message:"Snippet deleted"},{status:200});
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  