import {StyleSheet} from 'react-native';

import {colors} from '@shared/theme';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
  },
  exportButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  placeholderContainer: {
    padding: 20,
    backgroundColor: colors.neutral[50],
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.neutral[700],
    textAlign: 'center',
  },
  recordItem: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    gap: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  recordDate: {
    fontSize: 10,
    color: colors.neutral[600],
    marginTop: 10,
    textAlign: 'right',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});
