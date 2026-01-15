import {BloodPressureReading} from '../../domain/models/bloodPressureReading';

import {BloodPressureFormValues} from './types';

export const toFormValues = (
  reading: BloodPressureReading | null,
): BloodPressureFormValues | null => {
  if (!reading) {
    return null;
  }
  const sysNum = Number(reading.systolic);
  const diaNum = Number(reading.diastolic);
  const ppmNum = Number(reading.pulse);

  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(ppmNum)) {
    console.warn('Invalid data found while mapping to form values:', reading);
    return null;
  }
  return {
    sys: sysNum,
    dia: diaNum,
    ppm: ppmNum,
  };
};

export const toReading = (
  fromValues: BloodPressureFormValues,
): BloodPressureReading => {
  return {
    id: '',
    systolic: fromValues.sys.toString(),
    diastolic: fromValues.dia.toString(),
    pulse: fromValues.ppm.toString(),
    createdAt: new Date().toISOString(),
  };
};
