"use client";
import { useSession } from "@/lib/auth/auth-client";

export default function Welcomer() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex ">
        <h2 className="text-3xl mx-auto">Loading...</h2>
      </div>
    );
  }

  const name = session?.user?.name || "Guest";
  return (
    <div className="flex">
      <h1 className="mx-auto text-3xl">Welcome, {name}</h1>
    </div>
  );
}
