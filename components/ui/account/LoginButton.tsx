import Link from "next/link";
import { Button } from "../button";

export default function LoginButton() {
  return (
    <>
      <Link href="/login">
        {" "}
        <Button type="button" variant="default" className="mt-5 mr-10">
          Login
        </Button>
      </Link>
    </>
  );
}
