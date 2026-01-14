import {BloodPressureReading} from '../../src/domain/models/bloodPressureReading';
import {toRecordModel, toReadingUI} from '../data/mappers/bloodPressureMapper';
import {BloodPressureRecordModel} from '../data/models/bloodPressureRecordModel';

import {IBloodPressureRepository} from './repositories/bloodPressureRepository';

let readings: BloodPressureRecordModel[] = [];

export const inMemoryBloodPressureRepository: IBloodPressureRepository = {
  save: (formData: BloodPressureReading): BloodPressureRecordModel => {
    const newReading = toRecordModel(formData);
    readings.push(newReading);
    return newReading;
  },
  getAll: (): BloodPressureReading[] => {
    return [...readings]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map(toReadingUI);
  },
  update: (
    id: string,
    formData: BloodPressureReading,
  ): BloodPressureRecordModel => {
    const index = readings.findIndex(reading => reading.createdAt === id);
    if (index === -1) {
      throw new Error('Reading not found');
    }
    const updatedReading = toRecordModel(formData);
    readings[index] = updatedReading;
    return updatedReading;
  },
  delete: (id: string): void => {
    readings = readings.filter(reading => reading.createdAt !== id);
  },
};
