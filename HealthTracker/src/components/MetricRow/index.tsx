import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

type MetricRowProps = {
  label: string;
  value: string;
};

const MetricRow = ({label, value}: MetricRowProps) => {
  return (
    <View style={styles.metricRow}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
};
export default MetricRow;
