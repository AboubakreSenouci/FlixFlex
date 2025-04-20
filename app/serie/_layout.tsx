import { Stack } from "expo-router";

export default function SeriesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Series Details",
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
