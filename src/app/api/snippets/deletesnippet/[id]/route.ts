import { connect } from "@/config/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import SnippetModel from "@/models/Snippet.model";
import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "@/corsMiddleware/corsMiddleware";

connect();

export async function DELETE(request: NextRequest, context: any): Promise<NextResponse> {
  const res = NextResponse.next();
  const preflight = setCorsHeaders(request, res); // Apply the CORS headers

  if (preflight) {
    return res; // Return early if it's a preflight request
  }

  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Use 401 for unauthorized access
    }

    const { params } = context;
    const snippetId = params.id;

    if (!snippetId) {
      return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
    }

    // Delete the snippet in the database
    await SnippetModel.findByIdAndDelete(snippetId);

    // Return the response
    return NextResponse.json({ message: "Snippet deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
