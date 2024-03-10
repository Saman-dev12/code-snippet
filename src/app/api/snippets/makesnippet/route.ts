import { connect } from "@/config/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import SnippetModel from "@/models/Snippet.model";
import { type NextRequest, NextResponse } from "next/server";

connect()
export async function POST(request: NextRequest) {
    try {
     const userId = getDataFromToken(request);
      const reqBody = await request.json();
      const { snippetName, language } = await reqBody;
        // console.log(snippetName,language);
        
      // Check for missing data in request body
      if (!snippetName || !language) {
        return NextResponse.json({ error: "Please enter all fields" }, { status: 400 });
      }
  
      // Proceed with snippet creation only if user is authenticated and data is valid
      const newSnippet = await new SnippetModel({
        snippetName,
        language,
        userId: userId, // Use user._id only if user is authenticated
      });
      
      
      const savedSnippet = await newSnippet.save();
      // console.log(savedSnippet);
  
      if (savedSnippet) {
        return NextResponse.json({ message: "Snippet Made" ,id:savedSnippet._id}, { status: 200 });
      } else {
        return NextResponse.json({ message: "Error" }, { status: 500 });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  