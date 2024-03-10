"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Page = ({ params }: { params: any }) => {
  const router = useRouter();

  const [text, setText] = useState("");
  const [snippetName, setSnippetName] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getSnippet = async () => {
      try {
        if (params?.id) {
          const res = await axios.get(`/api/snippets/getsnippet/${params.id}`);
          if (res.data.data) {
            setText(res.data.data.snippet);
            setSnippetName(res.data.data.snippetName);
            setLanguage(res.data.data.language);
            setLoading(false); // Set loading to false when data is fetched
          }
        }
      } catch (error) {
        console.error("Error fetching snippet:", error);
        setError("Error fetching snippet"); // Set error message
        setLoading(false); // Set loading to false in case of error
      }
    };
    getSnippet();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleCopyText = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/snippets/makesnippet/${params.id}`, {
        text,
        snippetName,
        language,
      });

      if (res.data.data) {
        setText("");
        setSnippetName("");
        setLanguage("");
        toast.success("Snippet saved successfully!");
        router.push("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error("An error occurred while saving the snippet.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto py-10 bg-gray-900 text-white">
      {loading ? ( // Conditional rendering of loading animation
        <div className="flex justify-center items-center text-white text-xl font-semibold py-8">
          <motion.div
            className="flex justify-center items-center h-auto p-auto "
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.5, loop: Infinity, ease: "linear" }}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-100"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-200"></div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="w-[80%]">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8">
              Add your snippet here...
            </h1>
            {/* SnippetName input */}
            <div className="mb-4">
              <label htmlFor="snippetName" className="text-gray-400 mb-1 block">
                Snippet Name
              </label>
              <input
                type="text"
                id="snippetName"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                className="px-3 py-2 border border-gray-400 rounded-md w-full bg-gray-800 text-white"
              />
            </div>
            {/* Language input */}
            <div className="mb-4">
              <label htmlFor="language" className="text-gray-400 mb-1 block">
                Language
              </label>
              <input
                type="text"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-400 rounded-md w-full bg-gray-800 text-white"
              />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex">
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    className="w-full h-64 bg-gray-700 text-white p-3 transition duration-500 ease-in-out transform"
                    value={text}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    className="absolute top-2 right-2 px-3 py-1 bg-gray-600 text-white rounded-md border border-gray-500 hover:bg-gray-800 transition duration-300"
                    onClick={handleCopyText}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 transition duration-300"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Page;
