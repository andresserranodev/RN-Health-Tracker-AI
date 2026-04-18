import {BottomSheetView} from '@gorhom/bottom-sheet';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, Text, Button} from 'react-native';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import BottomSheetLabeledInput from '@presentation/components/BottomSheetLabeledInput';

import {styles} from './BloodPressureForm.styles';
import {validationSchema} from './validationSchema';

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
    formState: {errors},
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
    <BottomSheetView style={styles.modalContent}>
      <Text style={styles.formTitle}>Add new register</Text>
      <Controller
        control={control}
        name='sys'
        render={({field: {onChange, onBlur, value}}) => (
          <BottomSheetLabeledInput
            label='Systolic (SYS)'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            keyboardType='numeric'
            error={errors.sys}
          />
        )}
      />

      <Controller
        control={control}
        name='dia'
        render={({field: {onChange, onBlur, value}}) => (
          <BottomSheetLabeledInput
            label='Diastolic (DIA)'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            keyboardType='numeric'
            error={errors.dia}
          />
        )}
      />

      <Controller
        control={control}
        name='ppm'
        render={({field: {onChange, onBlur, value}}) => (
          <BottomSheetLabeledInput
            label='Pulse (PPM)'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            keyboardType='numeric'
            error={errors.ppm}
          />
        )}
      />

      <View style={styles.buttonGroup}>
        <Button title='Close' onPress={onClose} />
        <Button title='Save' onPress={handleSubmit(onSubmit)} />
      </View>
    </BottomSheetView>
  );
}
