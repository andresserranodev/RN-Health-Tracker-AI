import { BloodPressureReading } from "../../src/domain/models/bloodPressureReading";
import { BloodPressureFormValues } from "./types";

export const toFormValues = (
  reading: BloodPressureReading
): BloodPressureFormValues => {
  return {
    sys: reading.systolic ?? 0,
    dia: reading.diastolic ?? 0,
    ppm: reading.pulse ?? 0,
  };
};
