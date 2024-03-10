"use client";
import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
export function TProvider({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      {/* <SessionProvider> */}
      {children}
      {/* </SessionProvider> */}
    </NextUIProvider>
  );
}
