import React, { useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationschema";
import { styles } from "./styles";
import { BloodPressureFormValues } from "./types";

import * as yup from "yup";

type BloodPressureFormProps = {
  onSubmit: (data: BloodPressureFormValues) => void;
  onClose: () => void;
  initialValues?: BloodPressureFormValues;
};

export default function BloodPressureForm({
  onSubmit,
  onClose,
  initialValues,
}: BloodPressureFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BloodPressureFormValues>({
    defaultValues: initialValues || {
      sys: undefined,
      dia: undefined,
      ppm: undefined,
    },
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

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
