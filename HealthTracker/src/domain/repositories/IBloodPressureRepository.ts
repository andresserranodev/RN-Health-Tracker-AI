import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {BloodPressureRecordModel} from '@domain/entities/BloodPressureRecord';

export interface IBloodPressureRepository {
  save: (formData: BloodPressureReading) => BloodPressureRecordModel;
  getAll: () => BloodPressureReading[];
  update: (
    id: string,
    formData: BloodPressureReading,
  ) => BloodPressureRecordModel;
  delete: (id: string) => void;
}
