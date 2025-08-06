import connectToDB from "@/lib/db";
import { connect } from "http2";

export default async function DayAdder() {
  try {
    await connectToDB();
    console.log("Connected to database for fetching days successfully.");
    
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  return;
}
