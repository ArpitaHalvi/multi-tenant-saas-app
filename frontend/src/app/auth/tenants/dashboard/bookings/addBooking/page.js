"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  customerName: z.string().min(6, "Name must be of atleast 6 characters."),
  service: z.string().min(6, "Service should be of atleast 6 characters."),
  address: z.string().min(8, "Address should of atleast 8 characters."),
});

export default function AddBooking() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      address: "",
      service: "",
      tenantId: null,
    },
  });
  const makeBooking = async () => {
    const response = await fetchWithAuth("/api/bookings", {});
    console.log("response: ", response);
    if (response.ok) {
      const data = await response.json();
      console.log("data: ", data);
    } else {
      console.log("Error while creating booking.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Card className="w-3/4 flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle>Add Booking</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Form {...form} className="w-full">
              <form onSubmit={form.handleSubmit()}>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
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
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-sm"
                          placeholder="Enter service"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-5"></div>
                <Textarea placeholder="Enter your address"></Textarea>
                <div className="my-5"></div>
                <Button type="submit" className="w-full">
                  Add
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
