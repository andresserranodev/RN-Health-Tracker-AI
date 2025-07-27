import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  metricLabel: {
    fontSize: 16,
    color: "#666",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
