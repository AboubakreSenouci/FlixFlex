import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#0F0F0F",
          borderTopColor: "#333",
        },
        headerStyle: {
          backgroundColor: "#0F0F0F",
        },
        headerTintColor: "#FFF",
      }}
    >
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          title: "TV Series",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
