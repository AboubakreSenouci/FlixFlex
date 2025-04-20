import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useOnboardingStatus = () => {
  const [isChecking, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const key = await AsyncStorage.getItem("@onboarding_completed");
        setIsChecked(true);
        if (key) {
          router.replace("/(auth)/signin");
        }
      } catch (error) {
        setIsChecked(true);
      }
    };
    checkOnboardingStatus();
  }, []);

  return isChecking;
};
