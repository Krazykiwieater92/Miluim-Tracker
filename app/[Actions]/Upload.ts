"use server";

import connectToDb from "@/lib/db";
import mongoose from "mongoose";
import ServiceDays from "../[models]/ServiceDays";

export default async function UploadToDb(formData: FormData) {
  try {
    await connectToDb();
    console.log("Connected to database successfully.");

    const days = Number(formData.get("days"));
    const startDate = new Date(formData.get("startDate") as string);
    const realDate = startDate.toISOString().split("T")[0] || "";
    const endDate = new Date(formData.get("endDate") as string);

    await ServiceDays.create({
      userId: new mongoose.Types.ObjectId(),
      totalDays: days,
      startDate: new Date(realDate).getTime() + 86400000, // Add 1 day in milliseconds
      endDate: endDate,
    });
    console.log(
      { days },
      "Data uploaded successfully to the database.",
      { startDate },
      "is when you started your miluim service.",
      { endDate },
      "is when you ended your miluim service."
    );

    return { success: true, message: "Data uploaded successfully." };
  } catch (error) {
    console.error("Error uploading to database:", error);
    return { success: false, message: "Error uploading data." };
  } finally {
  }
}
