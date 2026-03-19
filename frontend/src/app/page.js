import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold text-center w-1/2">
        Multi Tenant Saas System
      </h1>
      <div className="w-1/2 flex justify-center items-center my-5">
        <Link href="/auth/tenants/register">
          <Button>Create Account</Button>
        </Link>
        <div className="mx-5"></div>
        <Link href="/auth/tenants/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}
