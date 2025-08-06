import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div>
          <Link href="/">
            <Button>Home</Button>
          </Link>
        </div>
        <div className="w-full max-w-sm md:max-w-3xl">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
