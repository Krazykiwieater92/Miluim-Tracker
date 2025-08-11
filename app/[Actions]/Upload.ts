"use server";

import { auth } from "@/lib/auth/auth";
import connectToDb from "@/lib/db";
import { headers } from "next/headers";
import mongoose from "mongoose";
import ServiceDays from "../[models]/ServiceDays";
import { revalidatePath } from "next/cache";

function calculateTotalDays(startDate: Date, endDate: Date): number {
  if (!startDate || !endDate) return 0;
  if (endDate < startDate) return 0;

  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  return daysDifference;
}
export default async function UploadToDb(formData: FormData) {
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Authentication required");
    }

    await connectToDb();
    console.log("Connected to database successfully.");

    const days = Number(formData.get("days"));
    const startDate = new Date(formData.get("startDate") as string);
    const realDate = startDate.toISOString().split("T")[0] || "";
    const endDate = new Date(formData.get("endDate") as string);
    const name = formData.get("name") as string;
    const calculatedDays = calculateTotalDays(startDate, endDate);

    //else error validation
    if (name.length > 50) {
      throw new Error("Name must be less than 50 characters.");
    } else if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long.");
    }

    if (calculatedDays <= 0) {
      throw new Error("Invalid date range. End date must be after start date.");
    }
    await ServiceDays.create({
      userId: session.user.id, // Use actual user ID from session
      totalDays: calculatedDays,
      endDate: endDate,
      startDate: new Date(realDate),
      name: formData.get("name") as string,
    });
    console.log(
      { name },
      "is the name of your miluim service.",
      { days },
      "Data uploaded successfully to the database.",
      { startDate },
      "is when you started your miluim service.",
      { endDate },
      "is when you ended your miluim service."
    );
    revalidatePath("/");
    return { success: true, message: "Data uploaded successfully." };
  } catch (error) {
    console.error("Error uploading to database:", error);
    return { success: false, message: "Error uploading data." };
  } finally {
  }
}
