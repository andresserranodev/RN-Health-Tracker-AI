import { bloodPressureRepository } from '../../data/repository/BloodPressureRepository';

export const getLastBloodPressureUseCase = () => {
    const allRecords = bloodPressureRepository.getAll();
    return allRecords[0];
  };