import { Stack } from "expo-router";

export default function MovieLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Movie Details",
          headerStyle: {
            backgroundColor: "#0F0F0F",
          },
          headerTintColor: "#FFF",
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
