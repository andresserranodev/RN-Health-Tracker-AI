import {inMemoryBloodPressureRepository} from '../../data/inMemoryBloodPressureRepository';

export const deleteBloodPressureRecordUseCase = (id: string) => {
  inMemoryBloodPressureRepository.delete(id);
};
