/**
 * Represents the data related to blood pressure measurements.
 *
 * @typedef BloodPressureFormValues
 *
 * @property {number} sys - The systolic blood pressure value, typically the higher number in a blood pressure reading.
 * @property {number} dia - The diastolic blood pressure value, typically the lower number in a blood pressure reading.
 * @property {number} ppm - The pulse per minute (heart rate) associated with the blood pressure measurement.
 */
export type BloodPressureFormValues = {
  sys: number;
  dia: number;
  ppm: number;
};
