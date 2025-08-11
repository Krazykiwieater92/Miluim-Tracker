"use client";
import { signOut } from "@/lib/auth/auth-client";
import { Button } from "../button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut();
      // Optional: redirect or refresh
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="mt-3 ml-auto"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
