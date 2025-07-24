import { bloodPressureRepository } from '../../data/repository/BloodPressureRepository';
import { BloodPressureData } from '../../../feature/BloodPressureForm';

export const saveBloodPressureUseCase = (data: BloodPressureData) => {
    const savedRecord = bloodPressureRepository.save(data);
    return savedRecord;
  };