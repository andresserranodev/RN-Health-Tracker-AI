import { IBloodPressureRepository } from "./repositories/bloodPressureRepository";
import { BloodPressureRecordModel } from "../data/models/bloodPressureRecordModel";
import { BloodPressureReading } from "../../src/domain/models/bloodPressureReading";
import {
  toRecordModel,
  toReadingUI,
} from "../data/mappers/bloodPressureMapper";

let readings: BloodPressureRecordModel[] = [];

export const inMemoryBloodPressureRepository: IBloodPressureRepository = {
  save: (formData: BloodPressureReading): BloodPressureRecordModel => {
    const newReading = toRecordModel(formData);
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
