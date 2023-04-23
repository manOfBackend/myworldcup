import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { UserCredential } from "firebase/auth";

import type { User } from "./types";

export async function getDecodedToken(userToken: string): Promise<DecodedIdToken | null> {
  if (!userToken) return null;

  try {
    const baseUrl = "http://localhost:3000";

    const decodedToken: DecodedIdToken = await fetch(`${baseUrl}/api/verifyIdToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userToken }),
    }).then((res) => res.json());

    if (decodedToken.error) return null;

    return decodedToken;
  } catch (error) {
    console.error("getDecodedToken CATCH ERROR", error);
    return null;
  }
}

export function getUserFromDecodedToken(decodedToken: DecodedIdToken, userToken: string): User {
  const {
    uid,
    name,
    email,
    picture: photoURL,
    firebase: { sign_in_provider: provider },
  } = decodedToken;

  return {
    uid,
    email,
    name,
    photoURL,
    token: userToken,
    provider,
  };
}

export async function getUserFromUserCredential(userCredential: UserCredential): Promise<User | undefined> {
  const { user } = userCredential;
  const token = await user.getIdToken();

  const { uid, displayName: name, email, photoURL, providerId: provider } = user;

  if (!token) return;

  return {
    uid,
    email,
    token,
    photoURL,
    name,
    provider,
  };
}
