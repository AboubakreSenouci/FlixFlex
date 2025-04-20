import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Toast from "react-native-toast-message";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    Toast.show({
      type: "success",
      text1: "Account created!",
      text2: "Welcome to our app! 👋",
    });
    return userCredential;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: "Sign up failed",
      text2: getErrorMessage(error),
    });
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    Toast.show({
      type: "success",
      text1: "Welcome back!",
      text2: "You have successfully logged in 🎉",
    });
    return userCredential;
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: "Sign in failed",
      text2: getErrorMessage(error),
    });
    throw error;
  }
};

function getErrorMessage(error: any): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    default:
      return "Registration failed. Please try again.";
  }
}
