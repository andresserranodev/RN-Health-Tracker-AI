import {format} from 'date-fns';

import {BloodPressureReading} from '../../domain/models/bloodPressureReading';
import {BloodPressureRecordModel} from '../models/bloodPressureRecordModel';

export const toRecordModel = (
  formData: BloodPressureReading,
): BloodPressureRecordModel => {
  const sysNum = Number(formData.systolic);
  const diaNum = Number(formData.diastolic);
  const ppmNum = Number(formData.pulse);

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

export const toReadingUI = (
  recordModel: BloodPressureRecordModel,
): BloodPressureReading => {
  const dateObject = new Date(recordModel.createdAt);
  const formattedDate = format(dateObject, 'hh:mm a-dd/MM/yyyy');
  return {
    id: recordModel.createdAt, // TODO replace with DB implementation
    systolic: recordModel.sys.toString(),
    diastolic: recordModel.dia.toString(),
    pulse: recordModel.ppm.toString(),
    createdAt: formattedDate,
  };
};
