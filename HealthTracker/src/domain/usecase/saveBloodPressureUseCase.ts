import { inMemoryBloodPressureRepository as registroRepository } from '../../data/inMemoryBloodPressureRepository'; 
import { BloodPressureReading } from '../../domain/models/bloodPressureReading';

export const saveBloodPressureRecordUseCase = (data: BloodPressureReading) => {
  return registroRepository.save(data); 
};

