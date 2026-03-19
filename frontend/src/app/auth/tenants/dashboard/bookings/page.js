"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BookingsPage() {
  const auth = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const response = await fetchWithAuth("/api/bookings");
      console.log("response: ", response);

      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);

        setBookings(data.bookings);
      } else {
        console.log("Error fetching bookings.");
      }
    };
    if (auth?.accessToken) {
      loadBookings();
    }
  }, [auth]);

  return (
    <div className="h-screen w-full flex flex-col">
      <h2 className="text-3xl font-semibold">Bookings</h2>
      <hr className="my-3 border-2"></hr>
      <Table>
        <TableCaption>List of all the bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell className="text-lg font-semibold">
                No Bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.customerId?.name}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="absolute right-10 bottom-10">
        <Link href="/auth/tenants/dashboard/bookings/addBooking">
          <Button className="text-2xl">+</Button>
        </Link>
      </div>
    </div>
  );
}
