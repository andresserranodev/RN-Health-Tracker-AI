import {BloodPressureReading} from '../../domain/models/bloodPressureReading';
import {BloodPressureRecordModel} from '../models/bloodPressureRecordModel';

export interface IBloodPressureRepository {
  save: (formData: BloodPressureReading) => BloodPressureRecordModel;
  getAll: () => BloodPressureReading[];
  update: (
    id: string,
    formData: BloodPressureReading,
  ) => BloodPressureRecordModel;
  delete: (id: string) => void;
}
