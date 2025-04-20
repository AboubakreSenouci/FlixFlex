import { Slot } from "expo-router";
import Toast from "react-native-toast-message";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Slot />;
      </QueryClientProvider>
      <Toast />
    </>
  );
}
