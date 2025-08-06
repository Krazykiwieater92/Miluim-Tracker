import MiluimCounter from "@/components/ui/tracker/MiluimCounter";
import { Separator } from "@/components/ui/separator";
import DayDisplay from "@/components/ui/tracker/DayDisplay";

export default function Home() {
  return (
    <>
      <div className="grid cols-2 md:grid-cols-2 gap-4 ">
        <MiluimCounter />
        <DayDisplay />
      </div>
    </>
  );
}
