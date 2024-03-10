"use client";
import Image from "next/image";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";

const HeroSection = () => {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    // <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
    //   <Image src="/hero-image.webp" alt="Background Image" layout="fill" objectFit="cover" quality={100} className="opacity-20"/>
    //   <div className="text-center p-12 bg-black bg-opacity-40 backdrop-blur-md rounded-lg shadow-xl">
    //     <h1 className="text-6xl font-bold text-white mb-6">Explore Code Snippets</h1>
    //     <p className="text-xl text-white mb-8">A curated collection for enthusiastic developers.</p>
    //     <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">Discover Now</button>
    //   </div>
    // </div>
    <>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Code Snippet
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          <div className="btn flex justify-center items-center gap-4">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {/* todo */}
                <Link href="/dashboard">Get Started</Link>
              </div>
            </button>
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {/* todo */}
                <Link href="/howtouse">How to use</Link>
              </div>
            </button>
          </div>
          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
