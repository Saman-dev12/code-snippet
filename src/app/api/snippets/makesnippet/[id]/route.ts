import { connect } from "@/config/db"; // Assuming a database connection function
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { type NextRequest, NextResponse } from "next/server";
import SnippetModel from "@/models/Snippet.model";

// Ensure database connection before handling requests
connect(); // Replace with your actual connection logic

export async function PUT(request: NextRequest,context:any) {
  try {
    // Check user authentication using the getDataFromToken function
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Use 401 for unauthorized access
    }

    // Extract snippet ID and data from the request
    
    const {params} = context;
    const snippetId = params.id;
    // console.log(snippetId);
    
    if (!snippetId) {
      return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
    }

    const { text,snippetName,language } = await request.json();
    if (!text) {
      return NextResponse.json({ message: "Snippet data is required" }, { status: 400 });
    }

    // Update the snippet in the database
    const updatedSnippet = await SnippetModel.findByIdAndUpdate(
      snippetId,
      { snippet : text,snippetName,language },
      { new: true } // Return the updated document
    );
    
    if (!updatedSnippet) {
      return NextResponse.json({ message: "Snippet not found" }, { status: 404 });
    }
    // console.log(updatedSnippet);

    // Return the updated snippet
    return NextResponse.json({data:updatedSnippet},{status:200});
  } catch (error: any) {
    console.error("Error updating snippet:", error);
    return NextResponse.json({ message: "Error updating snippet" }, { status: 500 });
  }
}
