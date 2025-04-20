import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { FormSubmitButton, FormTextField } from "@/components";
import { SignInForm, SignInSchema } from "@/types";
import { signIn } from "@/services/auth";

export default function SignIn() {
  const methods = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    try {
      await signIn(data.email, data.password);
      router.replace("/(tabs)/movies");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <FormProvider {...methods}>
        <FormTextField
          name="email"
          control={methods.control}
          placeholder="Email"
          autoCapitalize="none"
        />

        <FormTextField
          name="password"
          control={methods.control}
          placeholder="Password"
          secureTextEntry
        />

        <View style={styles.button}>
          <FormSubmitButton
            onSubmit={onSubmit}
            title="Sign In"
            style={styles.submitButton}
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
