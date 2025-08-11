import MiluimCounter from "@/components/ui/tracker/MiluimCounter";
import { Separator } from "@/components/ui/separator";
import DayDisplay from "@/components/ui/tracker/DayDisplay";
import Welcomer from "@/components/ui/tracker/welcomer";
import LoginButton from "@/components/ui/account/LoginButton";
import SignUpButton from "@/components/ui/account/SignUp";

export default function Home() {
  return (
    <>
      <div className="mt-5">
        <Welcomer />
       
      </div>
      <div className="grid cols-2 md:grid-cols-2 gap-4 ">
        <MiluimCounter />
        <DayDisplay />
      </div>
    </>
  );
}
