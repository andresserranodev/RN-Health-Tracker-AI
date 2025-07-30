import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import { bloodPressureRepository } from "../../data/mmkvBloodPressureRepository";

export const getAllBloodPressureReadingsUseCase =
  (): BloodPressureReading[] => {
    const readings = bloodPressureRepository.getAll();
    return readings;
  };
