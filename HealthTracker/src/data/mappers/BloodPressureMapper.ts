import { BloodPressureRecordModel } from '../models/BloodPressureRecord';
import {BloodPressureData} from '../../../feature/BloodPressureForm'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const toReadingModel = (formData: BloodPressureData): BloodPressureRecordModel => {
    return {
      id: uuidv4(),
      sys: formData.sys,
      dia: formData.dia,
      ppm: formData.ppm,
      createdAt: new Date().toISOString(),
    };
  };

  export const toReadingUI = (readingModel: BloodPressureRecordModel): BloodPressureData => {
    return {
      sys: readingModel.sys,
      dia: readingModel.dia,
      ppm: readingModel.ppm,
    };
  };