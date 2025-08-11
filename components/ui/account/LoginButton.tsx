import Link from "next/link";
import { Button } from "../button";

export default function LoginButton() {
  return (
    <>
      <Link href="/login">
        {" "}
        <Button type="button" variant="default" className="mt-3 ml-auto">
          Login
        </Button>
      </Link>
    </>
  );
}
