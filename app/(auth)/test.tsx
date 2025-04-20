import { StyleSheet, Text, View } from "react-native";
import React from "react";

const test = () => {
  return (
    <View style={styles.container}>
      <Text>Test Compoennt beta version  </Text>
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
