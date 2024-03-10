"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-lg">
            &copy; {new Date().getFullYear()} Code Snippet. All rights reserved.
          </div>
          <div className="">
            Made with <span>❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
