"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex justify-center items-center flex-col min-h-screen bg-pink-100 space-y-6">
      <section className="w-[15rem] space-y-1 bg-slate-200 p-8 rounded-lg">
        <div className="space-y-2.5">
          <h2 className="text-xl text-center">模拟登录</h2>
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => {
              router.push("/auth");
            }}
          >
            前往登录页面
          </Button>
          <Button
            size={"lg"}
            variant={"destructive"}
            className="w-full"
            onClick={() => {
              Cookies.remove("AuthToken");
              toast({
                title: "模拟退出登录",
                description: "删除 Token 成功",
                duration: 3000,
              });
            }}
          >
            退出登录
          </Button>
        </div>
      </section>
      <section className="w-[15rem]">
        <div className="space-y-2.5">
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => {
              router.push("/about");
            }}
          >
            前往 About
          </Button>
        </div>

        <pre className="mt-2 rounded-md bg-slate-950 p-4 text-center">
          <code className="text-white">
            {JSON.stringify(Cookies.get("AuthToken"))}
          </code>
        </pre>
      </section>
    </main>
  );
}
