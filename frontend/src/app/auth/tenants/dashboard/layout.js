"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!auth?.accessToken) {
      router.push("/auth/tenants/login");
    }
  }, [auth, router]);
  return (
    <div className="flex h-screen">
      <aside className="bg-neutral-900 w-1/4 h-screen">
        <nav className="flex flex-col gap-4 text-white h-full mx-10 my-10">
          <Link href="/auth/tenants/dashboard">OVERVIEW</Link>
          <Link href="/auth/tenants/dashboard/bookings">BOOKINGS</Link>
          <Link href="/auth/tenants/dashboard/customers">CUSTOMERS</Link>
          <Link href="/auth/tenants/dashboard/staff">STAFF</Link>
          {/* <Link href="/auth/tenants/dashboard/staffs">Staffs</Link> */}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
