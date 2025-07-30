//import { inMemoryBloodPressureRepository as registroRepository } from "../../data/inMemoryBloodPressureRepository";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import { bloodPressureRepository as registroRepository } from "../../data/volatileBloodPressureRepository";

export const saveBloodPressureRecordUseCase = (data: BloodPressureReading) => {
  return registroRepository.save(data);
};
