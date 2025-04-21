import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useSigninStatus = () => {
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSigninStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsChecking(true);
        if (token) {
          router.replace("/(tabs)/movies");
        }
      } catch (error) {
        setIsChecking(true);
      }
    };

    checkSigninStatus();
  }, []);

  return isChecking;
};
