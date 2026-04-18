import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React from 'react';
import {FieldError} from 'react-hook-form';
import {View, Text, TextInputProps} from 'react-native';

import {styles} from '../LabeledInput/styles';

interface BottomSheetLabeledInputProps extends TextInputProps {
  label: string;
  error?: FieldError;
}

const BottomSheetLabeledInput = ({
  label,
  error,
  ...textInputProps
}: BottomSheetLabeledInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <BottomSheetTextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor='#999'
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default BottomSheetLabeledInput;
