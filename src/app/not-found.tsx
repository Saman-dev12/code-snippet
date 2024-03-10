import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="bg-white  font-semibold  text-center h-screen flex justify-center items-center  flex-col">
      <div className="text-blue-500 underline text-4xl">Not Found</div>
      <Link
        href="/"
        className="px-5 py-2 bg-gray-400 mt-10 rounded-xl text-black no-underline text-xl"
      >
        Go back
      </Link>
    </div>
  );
};

export default notFound;
