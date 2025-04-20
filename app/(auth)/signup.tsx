import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FormTextField, FormSubmitButton } from "@/components";
import { SignUpForm, signUpSchema } from "@/types";
import { signUp } from "@/services/auth";

export default function SignUp() {
  const methods = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp(data.email, data.password);
      router.replace("/(auth)/signin");
    } catch (error) {
      // console.log("ERROR", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <FormProvider {...methods}>
        <FormTextField
          name="email"
          control={methods.control}
          placeholder="Email"
          autoCapitalize="none"
          rules={{ required: "Email is required" }}
        />

        <FormTextField
          name="password"
          control={methods.control}
          placeholder="Password"
          secureTextEntry
          rules={{ required: "Password is required" }}
        />

        <FormTextField
          name="confirmPassword"
          control={methods.control}
          placeholder="Confirm Password"
          secureTextEntry
          rules={{ required: "Please confirm your password" }}
        />

        <View style={styles.button}>
          <FormSubmitButton
            onSubmit={onSubmit}
            title="Sign Up"
            style={styles.submitButton}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0E0E0E",
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  button: {
    marginVertical: 24,
  },
  submitButton: {
    backgroundColor: "#00A693",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  link: {
    color: "white",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
});
