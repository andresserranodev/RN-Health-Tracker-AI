import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import { bloodPressureRepository as registroRepository } from "../../data/mmkvBloodPressureRepository";

export const saveBloodPressureRecordUseCase = (data: BloodPressureReading) => {
  return registroRepository.save(data);
};
