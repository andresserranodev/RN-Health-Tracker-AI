import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";
import { styles } from "./styles";

interface LabeledInputProps extends TextInputProps {
  label: string;
  error?: FieldError;
}

const LabeledInput = ({
  label,
  error,
  ...textInputProps
}: LabeledInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#999"
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default LabeledInput;
