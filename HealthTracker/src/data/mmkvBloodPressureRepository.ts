import { IBloodPressureRepository } from "./repositories/bloodPressureRepository";
import { BloodPressureRecordModel } from "./models/bloodPressureRecordModel";
import { BloodPressureReading } from "../domain/models/bloodPressureReading";
import { toRecordModel, toReadingUI } from "./mappers/bloodPressureMapper";
import { storage } from "./db/mmkv";

const RECORDS_KEY = "blood_pressure_records";

const getAllRawRecords = (): BloodPressureRecordModel[] => {
  const recordsJson = storage.getString(RECORDS_KEY);
  if (recordsJson) {
    return JSON.parse(recordsJson);
  }
  return [];
};

export const bloodPressureRepository: IBloodPressureRepository = {
  save: (
    bloodPressureReading: BloodPressureReading
  ): BloodPressureRecordModel => {
    const newRecord = toRecordModel(bloodPressureReading);

    const existingRecords = getAllRawRecords();

    const updatedRecords = [...existingRecords, newRecord];

    const recordsJson = JSON.stringify(updatedRecords);

    storage.set(RECORDS_KEY, recordsJson);

    return newRecord;
  },
  getAll: (): BloodPressureReading[] => {
    const records = getAllRawRecords();
    console.log(records);
    if (records.length === 0) {
      return [];
    }
    return [...records]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map(toReadingUI);
  },
};
