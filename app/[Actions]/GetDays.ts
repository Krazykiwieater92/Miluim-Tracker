import connectToDB from "@/lib/db";
import ServiceDays from "../[models]/ServiceDays";

export default async function GetDays() {
  try {
    await connectToDB();
    console.log("Database connection for day retrieval successful");
    const days = await ServiceDays.find();
    return days;
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  return;
}
