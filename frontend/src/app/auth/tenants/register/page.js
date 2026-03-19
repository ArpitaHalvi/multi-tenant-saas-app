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
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/authSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const formSchema = z.object({
  name: z.string().min(6, "Name must be of atleast 6 characters."),
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
  const registerMutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch(`${baseUrl}/api/auth/tenants/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Registration failed.");
        throw new Error(data.message || "Registration failed");
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
      alert("Registered successfully.");
    },
    onError: (error) => {
      form.reset();
      alert("Error while registration.", error.message);
    },
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Card className="w-1/2 flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>Create account</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Form {...form} className="w-full">
              <form
                onSubmit={form.handleSubmit((values) =>
                  registerMutation.mutate(values),
                )}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
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
                          className="rounded-sm"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-5"></div>
                <Button type="submit" className="w-full">
                  {registerMutation.isPending
                    ? "Creating..."
                    : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div>
              Already have an account?
              <Link href="/auth/tenants/login">
                <span className="mx-3 text-blue-800 font-semibold">Login</span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
