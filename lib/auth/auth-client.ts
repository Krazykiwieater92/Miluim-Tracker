import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000/api/auth",
});
export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  return authClient.signIn.email({ email, password });
};

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
  name: string
) => {
  return authClient.signUp.email({ email, password, name });
};
export const { signOut, signUp, useSession } = authClient;
