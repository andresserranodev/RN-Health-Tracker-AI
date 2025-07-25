import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.text}>Analyzing...</Text>
      </View>
    </View>
  );
};

export default LoadingOverlay;
