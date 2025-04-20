import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

interface LoadingProps {
  color?: string;
  size?: "small" | "large" | number;
  statusBarStyle?: "light" | "dark";
}

const Loading: React.FC<LoadingProps> = ({
  color = "#FFF",
  size = "large",
  statusBarStyle = "light",
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={statusBarStyle} />
      <ActivityIndicator size={size} color={color} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default Loading;
