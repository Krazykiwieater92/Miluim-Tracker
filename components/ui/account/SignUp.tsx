import { auth } from "@/lib/auth/auth";
import { Button } from "../button";
import Link from "next/link";

export default async function SignUpButton() {
  return (
    <>
      <Link href="/signup">
        <Button type="button" variant="secondary" className="mt-3 ">
          Sign Up
        </Button>
      </Link>
    </>
  );
}
