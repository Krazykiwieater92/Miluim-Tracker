import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import ServiceDays from "../[models]/ServiceDays";
import connectToDb from "@/lib/db";

export default async function GetDays() {
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return []; // Return empty array for unauthenticated users
    }

    await connectToDb();

    const serviceDays = await ServiceDays.find({
      userId: session.user.id,
    })
      .sort({ startDate: -1 }) // Most recent first
      .lean(); // Better performance

    return serviceDays;
  } catch (error) {
    console.error("Failed to fetch service days:", error);
    return [];
  }
}
