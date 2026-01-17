import {BloodPressureReading} from '@domain/entities/BloodPressureReading';

export interface IGeminiRepository {
  getReadingsFromImage(imageBase64: string): Promise<BloodPressureReading>;
}
