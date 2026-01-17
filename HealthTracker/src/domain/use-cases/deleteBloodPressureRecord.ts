import {IBloodPressureRepository} from '@domain/repositories/IBloodPressureRepository';
import {container} from '@infrastructure/di/Container';

export const createDeleteBloodPressureRecordUseCase = (
  bloodPressureRepository: IBloodPressureRepository,
) => {
  return (id: string) => {
    bloodPressureRepository.delete(id);
  };
};

// Export singleton for convenience
export const deleteBloodPressureRecordUseCase =
  createDeleteBloodPressureRecordUseCase(container.bloodPressureRepository);
