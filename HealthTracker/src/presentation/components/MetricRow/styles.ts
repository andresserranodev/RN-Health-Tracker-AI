import {StyleSheet} from 'react-native';

import {colors} from '@shared/theme';

export const styles = StyleSheet.create({
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
  },
  metricLabel: {
    fontSize: 16,
    color: colors.neutral[700],
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[800],
  },
});
