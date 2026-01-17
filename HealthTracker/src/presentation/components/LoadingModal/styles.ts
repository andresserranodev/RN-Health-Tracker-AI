import {StyleSheet} from 'react-native';

import {colors} from '@shared/theme';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay.medium,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    backgroundColor: colors.overlay.dark,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    marginTop: 15,
    fontSize: 16,
  },
});
