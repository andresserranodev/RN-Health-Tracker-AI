import {format} from 'date-fns';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {BloodPressureRecordModel} from '@domain/entities/BloodPressureRecord';

// Converts form values to domain reading entity
export const formValuesToReading = (
  formValues: BloodPressureFormValues,
): BloodPressureReading => {
  return {
    id: '',
    systolic: formValues.sys.toString(),
    diastolic: formValues.dia.toString(),
    pulse: formValues.ppm.toString(),
    createdAt: new Date().toISOString(),
  };
};

// Converts domain reading to form values
export const readingToFormValues = (
  reading: BloodPressureReading | null,
): BloodPressureFormValues | null => {
  if (!reading) return null;

  const sysNum = Number(reading.systolic);
  const diaNum = Number(reading.diastolic);
  const ppmNum = Number(reading.pulse);

  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(ppmNum)) {
    return null;
  }

  return {
    sys: sysNum,
    dia: diaNum,
    ppm: ppmNum,
  };
};

// Converts domain reading to persistence record
export const readingToRecord = (
  reading: BloodPressureReading,
): BloodPressureRecordModel => {
  const sysNum = Number(reading.systolic);
  const diaNum = Number(reading.diastolic);
  const ppmNum = Number(reading.pulse);

  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(ppmNum)) {
    throw new Error('Invalid numeric value provided. Cannot create record.');
  }

  return {
    sys: sysNum,
    dia: diaNum,
    ppm: ppmNum,
    createdAt: new Date().toISOString(),
  };
};

// Converts persistence record to domain reading
export const recordToReading = (
  record: BloodPressureRecordModel,
): BloodPressureReading => {
  const dateObject = new Date(record.createdAt);
  const formattedDate = format(dateObject, 'hh:mm a-dd/MM/yyyy');

  return {
    id: record.createdAt,
    systolic: record.sys.toString(),
    diastolic: record.dia.toString(),
    pulse: record.ppm.toString(),
    createdAt: formattedDate,
  };
};
