// src/features/Home/useBloodPressureData.ts
import { useState, useMemo, useCallback, useEffect } from "react";
import { BloodPressureReading } from "../../../domain/models/bloodPressureReading";
import { BloodPressureFormValues } from "../../BloodPressureForm/types";
import { getAllBloodPressureReadingsUseCase } from "../../../domain/usecase/getAllBloodPressureReadingsUseCase";
import { saveBloodPressureRecordUseCase } from "../../../domain/usecase/saveBloodPressureUseCase";
import { toReading } from "../../BloodPressureForm/bloodPressureMapper";

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
    [bloodPressureReadings]
  );

  const refreshReadings = useCallback(() => {
    const bloodPressureReadings = getAllBloodPressureReadingsUseCase();
    console.log(bloodPressureReadings);
    setBloodPressure(bloodPressureReadings);
  }, []);

  const addBloodPressureReading = useCallback(
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
    bloodPressureReadings,
    lastBloodPressureReading,
    addBloodPressureReading,
  };
};
