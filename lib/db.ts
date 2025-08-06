import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}
