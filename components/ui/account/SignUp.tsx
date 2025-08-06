import { auth } from "@/lib/auth/auth";
import { Button } from "../button";
import Link from "next/link";

export default async function SignUpButton() {
  return (
    <>
      <Link href="/signup">
        <Button type="button" variant="secondary" className="mt-5 mr-10">
          Sign Up
        </Button>
      </Link>
    </>
  );
}
