import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import MetricRow from "../../components/MetricRow";

type HistoryListProps = {
  readings: BloodPressureReading[];
};

const ReadingItem = ({ item }: { item: BloodPressureReading }) => (
  <View style={styles.recordItem}>
    <MetricRow label="SYS:" value={item.systolic} />
    <MetricRow label="DIA:" value={item.diastolic} />
    <MetricRow label="PPM:" value={item.pulse} />
  </View>
);

const HistoryList = ({ readings }: HistoryListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={readings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReadingItem item={item} />}
        ListEmptyComponent={
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Your history will appear here once you add a record.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HistoryList;
