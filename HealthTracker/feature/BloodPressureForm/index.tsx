import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationschema";
import { styles } from "./styles";

import * as yup from "yup";

export type BloodPressureData = {
  sys: number;
  dia: number;
  ppm: number;
};

type BloodPressureFormProps = {
  onSubmit: (data: BloodPressureData) => void;
  onClose: () => void;
};

export default function RegistroForm({
  onSubmit,
  onClose,
}: BloodPressureFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BloodPressureData>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.modalContent}>
      <Text style={styles.formTitle}>Add new register</Text>

      <Controller
        control={control}
        name="sys"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Systolic (SYS)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
            {errors.sys && (
              <Text style={styles.errorText}>{errors.sys.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="dia"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Diastolic (DIA)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
            {errors.dia && (
              <Text style={styles.errorText}>{errors.dia.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="ppm"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Pulsations (PPM)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              keyboardType="numeric"
            />
            {errors.ppm && (
              <Text style={styles.errorText}>{errors.ppm.message}</Text>
            )}
          </>
        )}
      />

      <View style={styles.buttonGroup}>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
