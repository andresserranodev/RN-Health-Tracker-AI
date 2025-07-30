import { IBloodPressureRepository } from "./repositories/bloodPressureRepository";
import { BloodPressureRecordModel } from "./models/bloodPressureRecordModel";
import { BloodPressureReading } from "../domain/models/bloodPressureReading";
import { toRecordModel, toReadingUI } from "./mappers/bloodPressureMapper";

let readings: BloodPressureRecordModel[] = [];
// Expo Go only Use this in-memory array to simulate a database for testing purposes.
export const bloodPressureRepository: IBloodPressureRepository = {
  save: (
    bloodPressureReading: BloodPressureReading
  ): BloodPressureRecordModel => {
    const newReading = toRecordModel(bloodPressureReading);
    readings.push(newReading);
    return newReading;
  },
  getAll: (): BloodPressureReading[] => {
    return [...readings]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map(toReadingUI);
  },
};
