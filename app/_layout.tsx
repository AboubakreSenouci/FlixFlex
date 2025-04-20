import { Slot, Redirect, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  // if (!isChecked) {
  //   AsyncStorage.getItem("@onboarding_completed")
  //     .then((value) => {
  //       if (value === "true") {
  //         setShouldRedirect(true);
  //       }
  //     })
  //     .finally(() => {
  //       setIsChecked(true);
  //     });
  // }

  // useEffect(() => {
  //   const test = async () => {
  //     const key = await AsyncStorage.getItem("@onboarding_completed");
  //     setIsChecked(true);

  //     console.log("!key, ", key);

  //     if (key) {
  //       router.replace("/(auth)/signin");
  //     }
  //   };

  //   test();
  // }, []);

  // if (!isChecked) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </SafeAreaView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
