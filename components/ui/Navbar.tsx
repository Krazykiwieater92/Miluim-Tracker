import { Separator } from "@/components/ui/separator";
import { Link } from "lucide-react";
import SignUpButton from "./account/SignUp";
import LoginButton from "./account/LoginButton";
import SignOutButton from "./account/SignOutButton";

export default function Navbar() {
  return (
    <>
      {" "}
      <div className="flex items-center">
        <h1 className="text-4xl font-bold ml-10 mt-3 text-foreground">
          <a href="/">Miluim Tracker</a>
        </h1>
        <div className="items-center flex ml-auto mr-auto gap-3">
          <a
            className="text-2xl border-foreground bg-accent/30 border font-semibold  mt-3 hover:bg-foreground hover:text-secondary
         transition duration-100 rounded-md p-1"
            href="/history"
          >
            History
          </a>
          <a
            className="text-2xl border-foreground bg-accent/30 border font-semibold mt-3 hover:bg-foreground hover:text-secondary
         transition duration-100 rounded-md p-1"
            href="/news"
          >
            News
          </a>
          <LoginButton />
          <SignUpButton />
          <SignOutButton />
        </div>
      </div>
      <div>
        <Separator className=" w-90% mt-3" />
      </div>
    </>
  );
}
