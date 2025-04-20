import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

interface LoadingProps {
  color?: string;
  size?: "small" | "large" | number;
}

const Loading: React.FC<LoadingProps> = ({
  color = "#FFF",
  size = "large",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
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
