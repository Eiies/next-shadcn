"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFolw } from "../types";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ky from "ky";
import { useRouter } from "next/navigation";

type SignInCardProps = {
  setState: (state: SignInFolw) => void;
};

const FormSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱" }),
  password: z
    .string()
    .min(1, { message: "密码不能为空" })
    .max(16, { message: "密码不能太长" }),
});

export default function SignInCard({ setState }: SignInCardProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // 登录成功后设置 token
    const res = await ky
      .post("http://localhost:3333/api/repeat", { json: { data: data } })
      .json();

    const token = "test-token";

    Cookies.set("AuthToken", token, {
      expires: 7,
      secure: false, // 仅通过 HTTPS
      path: "/", // Token 作用范围
      sameSite: "Strict", // 严格行为
    });
    toast({
      title: "登录成功",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>注册</CardTitle>
        <CardDescription>将使用 Email 进行登录</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size={"lg"}
              disabled={false}
            >
              登录
            </Button>
          </form>
        </Form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            variant={"outline"}
            onClick={() => {}}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          没有账户?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            前往注册
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
