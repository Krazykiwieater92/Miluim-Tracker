"use server";
import connectToDB from "@/lib/db";
import ServiceDays from "../[models]/ServiceDays";
import { revalidatePath } from "next/cache";

export default async function DeletePeriod(formData: FormData) {
  try {
    await connectToDB();
    console.log("Database connection for deletion successful");

    // Get the record ID from form data
    const recordId = formData.get("recordId") as string;

    if (!recordId) {
      throw new Error("Record ID is required");
    }

    // Delete the specific record
    await ServiceDays.findByIdAndDelete(recordId);

    revalidatePath("/");
    return { success: true, message: "Service period deleted successfully." };
  } catch (error) {
    console.error("Database connection failed:", error);
    return { success: false, message: "Error deleting service period." };
  }
}
