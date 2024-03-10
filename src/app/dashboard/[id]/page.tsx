"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Page = ({ params }: { params: any }) => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true); // State variable for loading
  const [error, setError] = useState<string | null>(null); // State variable for error
  const [snippetName, setSnippetName] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

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

  const handleCopyText = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-[80%]">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{snippetName}</h2>
              <p className="text-gray-400">{language}</p>
            </div>
            <div className="flex">
              <div className="relative flex-1">
                <div
                  ref={textareaRef}
                  className="w-full h-64 bg-gray-700 text-white p-3 transition duration-500 ease-in-out transform"
                >
                  {loading ? (
                    <div className="flex justify-center items-center text-white text-xl font-semibold py-8">
                      <motion.div
                        className="flex justify-center items-center h-auto p-auto "
                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0, rotate: 0 }}
                        transition={{
                          duration: 0.5,
                          loop: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping"></div>
                          <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-100"></div>
                          <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-200"></div>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    error || text
                  )}
                </div>

                <button
                  className="absolute top-2 right-2 px-3 py-1 bg-gray-600 text-white rounded-md border border-gray-500 hover:bg-gray-800 transition duration-300"
                  onClick={handleCopyText}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
