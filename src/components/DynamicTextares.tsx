"use client";
import { useState, useEffect, useRef } from "react";

const DynamicTextareaWithLines = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleCopyText = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
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
  );
};

export default DynamicTextareaWithLines;
