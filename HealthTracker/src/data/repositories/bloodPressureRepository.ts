import { BloodPressureRecordModel } from "../models/bloodPressureRecordModel";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";

export interface IBloodPressureRepository {
  save: (
    bloodPressureReading: BloodPressureReading
  ) => BloodPressureRecordModel;
  getAll: () => BloodPressureReading[];
}
