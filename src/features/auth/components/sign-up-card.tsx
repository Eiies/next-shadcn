"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInFolw } from "../types";
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

type SignInCardProps = {
  setState: (state: SignInFolw) => void;
};

const FormSchema = z
  .object({
    email: z.string().email({ message: "请输入有效的邮箱" }),
    password: z.string().min(4, { message: "密码最小长度为 4" }),
    confirm: z.string().min(4, { message: "请再次输入相同的密码" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "两次密码不一致",
    path: ["confirm"],
  });

export default function SignUpCard({ setState }: SignInCardProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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

            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="ConfirmPassword"
                      {...field}
                    />
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
          已经拥有账户?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            前往登录
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
