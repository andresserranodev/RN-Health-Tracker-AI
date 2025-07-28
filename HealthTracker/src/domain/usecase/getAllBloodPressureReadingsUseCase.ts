
import { inMemoryBloodPressureRepository } from '../../data/inMemoryBloodPressureRepository';

import { BloodPressureReading } from '../../domain/models/bloodPressureReading';

export const getAllBloodPressureReadingsUseCase = (): BloodPressureReading[] => {
  const readings = inMemoryBloodPressureRepository.getAll();
  return readings;
};