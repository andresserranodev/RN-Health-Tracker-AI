import {colors} from '@shared/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[400],
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});
