// src/features/Home/useBloodPressureData.ts
import {useState, useMemo, useCallback, useEffect} from 'react';

import {BloodPressureReading} from '../../../domain/models/bloodPressureReading';
import {deleteBloodPressureRecordUseCase} from '../../../domain/usecase/deleteBloodPressureRecordUseCase';
import {getAllBloodPressureReadingsUseCase} from '../../../domain/usecase/getAllBloodPressureReadingsUseCase';
import {saveBloodPressureRecordUseCase} from '../../../domain/usecase/saveBloodPressureUseCase';
import {toReading} from '../../BloodPressureForm/bloodPressureMapper';
import {BloodPressureFormValues} from '../../BloodPressureForm/types';

/**
 * @description Custom hook to manage the state and data operations for blood pressure readings.
 * @returns An object with the list of bloodPressureReadings, the latest lastBloodPressureReading, and functions to interact with the data setBloodPressure.
 */
export const useBloodPressureData = () => {
  const [bloodPressureReadings, setBloodPressure] = useState<
    BloodPressureReading[]
  >([]);

  const lastBloodPressureReading = useMemo(
    () => (bloodPressureReadings.length > 0 ? bloodPressureReadings[0] : null),
    [bloodPressureReadings],
  );

  const refreshReadings = useCallback(() => {
    const bloodPressureReadings = getAllBloodPressureReadingsUseCase();
    setBloodPressure(bloodPressureReadings);
  }, []);

  const addBloodPressureReading = useCallback(
    (formData: BloodPressureFormValues) => {
      saveBloodPressureRecordUseCase(toReading(formData));
      refreshReadings();
    },
    [refreshReadings],
  );

  useEffect(() => {
    const loadReadings = () => {
      const bloodPressureReadings = getAllBloodPressureReadingsUseCase();
      setBloodPressure(bloodPressureReadings);
    };
    loadReadings();
  }, []);

  const deleteBloodPressureReading = useCallback(
    (id: string) => {
      deleteBloodPressureRecordUseCase(id);
      refreshReadings();
    },
    [refreshReadings],
  );

  return {
    bloodPressureReadings,
    lastBloodPressureReading,
    addBloodPressureReading,
    deleteBloodPressureReading,
  };
};
