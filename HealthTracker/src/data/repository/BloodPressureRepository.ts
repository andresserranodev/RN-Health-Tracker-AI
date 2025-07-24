import { storage } from '../../db/mmkv';
import { BloodPressureRecordModel } from '../models/BloodPressureRecord';
import {toReadingModel } from '../mappers/BloodPressureMapper';
import {BloodPressureData} from '../../../feature/BloodPressureForm'

const READINGS_KEY = 'blood_pressure_readings';

export const bloodPressureRepository = {
    save: (formData: BloodPressureData): BloodPressureRecordModel => {
      const newReading = toReadingModel(formData);
      const existingReadings = bloodPressureRepository.getAll();
      const updatedReadings = [...existingReadings, newReading];
      storage.set(READINGS_KEY, JSON.stringify(updatedReadings));
      return newReading;
    },
  
    getAll: (): BloodPressureData[] => {
      const readingsJson = storage.getString(READINGS_KEY);
      if (!readingsJson) {
        return [];
      }
      return JSON.parse(readingsJson);
    },
  };