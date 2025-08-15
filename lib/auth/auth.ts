import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { twoFactor, username } from "better-auth/plugins";

const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://localhost:27017"
);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [username()],
  appName: "Miluim",
});
