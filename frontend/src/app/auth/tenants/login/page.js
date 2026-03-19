"use client";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { store } from "@/redux/store";
import { setAuth } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const formSchema = z.object({
  email: z.string().min(6, "Email should be of atleast 6 characters."),
  password: z.string().min(8, "Password should of atleast 8 characters."),
});

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch(`${baseUrl}/api/auth/tenants/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Login failed.");
        throw new Error(data.message || "Login Failed.");
      }
      return data;
    },
    onSuccess: (data) => {
      dispatch(
        setAuth({
          accessToken: data.accessToken,
          userId: data.userId,
          tenantId: data.tenantId,
        }),
      );
      form.reset();
      router.push("/auth/tenants/dashboard");
    },
    onError: (error) => {
      form.reset();
      alert("Error while login", error.message);
    },
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Card className="w-1/2 flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  loginMutation.mutate(values),
                )}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-5"></div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-5"></div>
                <Button type="submit" className="w-full">
                  {loginMutation.isPending ? "Please wait..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div>
              Don&apos;t have an account?
              <Link href="/auth/tenants/register">
                <span className="mx-3 text-blue-800 font-semibold">
                  Sign Up
                </span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
