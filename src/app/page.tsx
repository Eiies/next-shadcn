"use client";
import AuthScreen from "@/features/auth/components/auth-screen";
import React from "react";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col min-h-screen space-y-2">
      <AuthScreen />
    </main>
  );
}
