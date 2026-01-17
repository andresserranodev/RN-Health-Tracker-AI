import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {IBloodPressureRepository} from '@domain/repositories/IBloodPressureRepository';
import {container} from '@infrastructure/di/Container';

export const createGetAllBloodPressureReadingsUseCase = (
  bloodPressureRepository: IBloodPressureRepository,
) => {
  return (): BloodPressureReading[] => {
    return bloodPressureRepository.getAll();
  };
};

// Export singleton for convenience
export const getAllBloodPressureReadingsUseCase =
  createGetAllBloodPressureReadingsUseCase(container.bloodPressureRepository);
