import { ImageSourcePropType } from "react-native";
import { z } from "zod";

import { ViewToken } from "react-native";

export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface VideoResponse {
  results: Video[];
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInForm = z.infer<typeof SignInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password can't exceed 20 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;

export interface ViewableItemsChanged {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}
