import { BloodPressureRecordModel } from "../models/bloodPressureRecordModel";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";

export interface IBloodPressureRepository {
  save: (formData: BloodPressureReading) => BloodPressureRecordModel;
  getAll: () => BloodPressureReading[];
  update: (
    id: string,
    formData: BloodPressureReading
  ) => BloodPressureRecordModel;
  delete: (id: string) => void;
}
