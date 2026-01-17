import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {BloodPressureRecordModel} from '@domain/entities/BloodPressureRecord';
import {IBloodPressureRepository} from '@domain/repositories/IBloodPressureRepository';
import {
  readingToRecord,
  recordToReading,
} from '@infrastructure/mappers/BloodPressureMapper';

let readings: BloodPressureRecordModel[] = [];

export const inMemoryBloodPressureRepository: IBloodPressureRepository = {
  save: (formData: BloodPressureReading): BloodPressureRecordModel => {
    const newReading = readingToRecord(formData);
    readings.push(newReading);
    return newReading;
  },
  getAll: (): BloodPressureReading[] => {
    return [...readings]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map(recordToReading);
  },
  update: (
    id: string,
    formData: BloodPressureReading,
  ): BloodPressureRecordModel => {
    const index = readings.findIndex(reading => reading.createdAt === id);
    if (index === -1) {
      throw new Error('Reading not found');
    }
    const updatedReading = readingToRecord(formData);
    readings[index] = updatedReading;
    return updatedReading;
  },
  delete: (id: string): void => {
    readings = readings.filter(reading => reading.createdAt !== id);
  },
};
