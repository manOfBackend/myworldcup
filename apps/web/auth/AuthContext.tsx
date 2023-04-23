"use client";

import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { auth } from "../firebase/client";
import type { User } from "./types";
import { getDecodedToken, getUserFromDecodedToken, getUserFromUserCredential } from "./util";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
  sigInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  authLoading: boolean;
  setUserByCookies: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const setUserByCookies = useCallback(async (): Promise<void | null> => {
    const { userToken } = parseCookies();
    // setAuthLoading(true)

    if (!userToken) return null;

    const decodedToken: DecodedIdToken | null = await getDecodedToken(userToken);

    if (!decodedToken) return null;

    if (decodedToken) {
      const userFromDecodedToken = getUserFromDecodedToken(decodedToken, userToken);

      setUser(userFromDecodedToken);
    }

    // setAuthLoading(false)
  }, []);

  useEffect(() => {
    setUserByCookies();
  }, [setUserByCookies]);

  async function setUserFromUserCredential(userCredential: UserCredential) {
    const user = await getUserFromUserCredential(userCredential);

    if (!user) throw new Error("User not found");

    setUser(user);

    setCookie(null, "userToken", user.token, {
      maxAge: 7 * 24 * 60 * 60,
    });

    return user;
  }

  async function signIn(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      await setUserFromUserCredential(userCredential);
    } catch (error) {
      return false;
    }

    return true;
  }

  async function register(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setUserFromUserCredential(userCredential);
    } catch (error) {
      return false;
    }
    return true;
  }

  async function sigInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = await setUserFromUserCredential(userCredential);
    } catch (error) {}
  }

  async function signOut() {
    destroyCookie(null, "userToken");
    setUser(null);
    await auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        register,
        sigInWithGoogle,
        signOut,
        authLoading,
        setUserByCookies,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => useContext(AuthContext);
