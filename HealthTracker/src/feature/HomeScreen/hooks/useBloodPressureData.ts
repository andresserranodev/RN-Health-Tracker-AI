// src/features/Home/useBloodPressureData.ts
import { useState, useMemo, useCallback, useEffect } from "react";
import { BloodPressureReading } from "../../../domain/models/bloodPressureReading";
import { BloodPressureFormValues } from "../../BloodPressureForm/types";
import { getAllBloodPressureReadingsUseCase } from "../../../domain/usecase/getAllBloodPressureReadingsUseCase";
import { saveBloodPressureRecordUseCase } from "../../../domain/usecase/saveBloodPressureUseCase";
import { toReading } from "../../BloodPressureForm/bloodPressureMapper";

/**
 * @description Custom hook to manage the state and data operations for blood pressure readings.
 * @returns An object with the list of readings, the latest reading, and functions to interact with the data.
 */
export const useBloodPressureData = () => {
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);

  const lastReading = useMemo(
    () => (readings.length > 0 ? readings[0] : null),
    [readings]
  );

  const refreshReadings = useCallback(() => {
    const allReadings = getAllBloodPressureReadingsUseCase();
    console.log(allReadings);
    setReadings(allReadings);
  }, []);

  const addReading = useCallback(
    (formData: BloodPressureFormValues) => {
      saveBloodPressureRecordUseCase(toReading(formData));
      refreshReadings();
    },
    [refreshReadings]
  );

  useEffect(() => {
    refreshReadings();
  }, [refreshReadings]);

  return {
    readings,
    lastReading,
    addReading,
  };
};
