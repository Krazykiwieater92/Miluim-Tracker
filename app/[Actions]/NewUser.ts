"use server";
import connectToDB from "@/lib/db";
import User from "../[models]/User";
import { redirect } from "next/navigation";

export default async function NewUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    await connectToDB();
    console.log("Connected to database successfully.");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    console.log("User created successfully:", newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      throw new Error("User with this email already exists");
    }

    throw error;
  }

  redirect("/dashboard");
}
