import {Feather} from '@expo/vector-icons';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';

import MetricRow from '../../components/MetricRow';
import {BloodPressureReading} from '../../domain/models/bloodPressureReading';

import {styles} from './styles';

type HistoryListProps = {
  readings: BloodPressureReading[];
  onDelete: (id: string) => void;
};

const ReadingItem = ({
  item,
  onDelete,
}: {
  item: BloodPressureReading;
  onDelete: (id: string) => void;
}) => (
  <View style={styles.recordItem}>
    <MetricRow label='SYS:' value={item.systolic} />
    <MetricRow label='DIA:' value={item.diastolic} />
    <MetricRow label='PPM:' value={item.pulse} />
    <TouchableOpacity
      onPress={() => onDelete(item.id)}
      style={styles.deleteButton}>
      <Feather name='trash-2' size={24} color='red' />
    </TouchableOpacity>
  </View>
);

const HistoryList = ({readings, onDelete}: HistoryListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={readings}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ReadingItem item={item} onDelete={onDelete} />}
        ListEmptyComponent={
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Your history will appear here once you add a record.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default HistoryList;
