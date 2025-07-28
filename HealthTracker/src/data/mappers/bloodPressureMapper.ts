import { BloodPressureRecordModel } from '../models/bloodPressureRecordModel';
import {BloodPressureReading} from '../../domain/models/bloodPressureReading'
import { format } from 'date-fns';

export const toRecordModel = (formData: BloodPressureReading): BloodPressureRecordModel => {

  const sysNum = parseInt(formData.systolic ?? "", 10);
  const diaNum = parseInt(formData.diastolic ?? "", 10);
  const ppmNum = parseInt(formData.pulse ?? "", 10);
  return {
    sys: sysNum,
    dia: diaNum,
    ppm: ppmNum,
    createdAt: new Date().toISOString()
  };
  };

  export const toReadingUI = (recordModel: BloodPressureRecordModel): BloodPressureReading => {
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