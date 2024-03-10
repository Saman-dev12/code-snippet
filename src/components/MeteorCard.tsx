import React from "react";
import { Meteors } from "./ui/meteors";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export function MeteorCard({
  snippet,
  updatedSnippets,
}: {
  snippet: {
    _id: string;
    snippetName: string;
    language: string;
    snippet: string;
  };
  updatedSnippets: () => void;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/snippets/deletesnippet/${snippet._id}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        const newSnips = await axios.get("/api/snippets/getusersnippets");
        updatedSnippets(newSnips.data);
      } else {
        toast.error(res.data.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = () => {
    router.push(`/snippet/${snippet._id}`);
  };

  return (
    <div className="">
      <div className="w-full   relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="min-w-60 min-h-52 relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          <Link href={`/dashboard/${snippet._id}`}>
            <h1 className="font-bold text-xl text-white mb-4 relative z-50">
              {snippet.snippetName}
            </h1>

            <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
              {snippet.language}
            </p>
          </Link>

          <div className="flex">
            <button
              className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 mr-2 flex items-center hover:opacity-70 transition-opacity"
              onClick={handleEdit}
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 flex items-center hover:opacity-70 transition-opacity"
              onClick={handleDelete}
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
