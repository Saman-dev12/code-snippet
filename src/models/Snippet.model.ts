import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    snippetName: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



const SnippetModel =mongoose.models.snipps || mongoose.model("snipps", SnippetSchema);

export default SnippetModel;
