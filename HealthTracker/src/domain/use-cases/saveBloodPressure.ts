import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {IBloodPressureRepository} from '@domain/repositories/IBloodPressureRepository';
import {container} from '@infrastructure/di/Container';

export const createSaveBloodPressureUseCase = (
  bloodPressureRepository: IBloodPressureRepository,
) => {
  return (data: BloodPressureReading) => {
    return bloodPressureRepository.save(data);
  };
};

// Export singleton for convenience
export const saveBloodPressureRecordUseCase = createSaveBloodPressureUseCase(
  container.bloodPressureRepository,
);
