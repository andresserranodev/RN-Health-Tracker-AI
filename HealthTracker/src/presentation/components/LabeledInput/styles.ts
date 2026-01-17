import {StyleSheet} from 'react-native';

import {colors} from '@shared/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.neutral[800],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[400],
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: colors.neutral[300],
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
