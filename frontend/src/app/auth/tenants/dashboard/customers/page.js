"use client";

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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CustomersPage() {
  const auth = useSelector((state) => state.auth);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const response = await fetchWithAuth("/api/customers");
      //   console.log("response: ", response);
      if (response.ok) {
        const data = await response.json();
        // console.log("data: ", data);
        setCustomers(data.customers);
      } else {
        console.log("Error fetching bookings.");
      }
    };
    if (auth?.accessToken) {
      loadCustomers();
    }
  }, [auth]);

  return (
    <div className="h-screen w-full flex flex-col">
      <h2 className="text-3xl font-semibold">Customers</h2>
      <hr className="my-3 border-2"></hr>
      <Table>
        <TableCaption>List of all the customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell className="text-xl font-semibold">
                No Customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
