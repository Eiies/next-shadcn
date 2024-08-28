"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const onClick = () => {
  alert("Hello World!");
};

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col min-h-screen space-y-2">
      <h1 className="text-center text-4xl text-pink-200 hover:text-pink-400 hover:font-bold transition-all">
        你好世界
      </h1>

      <Button onClick={onClick} size={"lg"} className="w-full">
        {" "}
        Cllick Me{" "}
      </Button>
    </main>
  );
}
