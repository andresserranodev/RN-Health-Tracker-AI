import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import { bloodPressureRepository as registroRepository } from "../../data/mmkvBloodPressureRepository";

export const getAllBloodPressureReadingsUseCase =
  (): BloodPressureReading[] => {
    const readings = registroRepository.getAll();
    return readings;
  };
