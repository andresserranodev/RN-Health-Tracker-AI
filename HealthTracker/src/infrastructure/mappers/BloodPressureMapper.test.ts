import {format} from 'date-fns';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {BloodPressureRecordModel} from '@domain/entities/BloodPressureRecord';

import {
  formValuesToReading,
  readingToFormValues,
  readingToRecord,
  recordToReading,
} from './BloodPressureMapper';

describe('BloodPressureMapper', () => {
  describe('formValuesToReading', () => {
    it('Given valid form values, when converting to reading, then it should return a reading with string values', () => {
      // Arrange
      const formValues: BloodPressureFormValues = {
        sys: 120,
        dia: 80,
        ppm: 75,
      };

      // Act
      const result = formValuesToReading(formValues);

      // Assert
      expect(result).toEqual({
        id: '',
        systolic: '120',
        diastolic: '80',
        pulse: '75',
        createdAt: expect.any(String),
      });
      expect(new Date(result.createdAt).toString()).not.toBe('Invalid Date');
    });

    it('Given form values with decimal numbers, when converting to reading, then it should convert them to strings', () => {
      // Arrange
      const formValues: BloodPressureFormValues = {
        sys: 120.5,
        dia: 80.3,
        ppm: 75.7,
      };

      // Act
      const result = formValuesToReading(formValues);

      // Assert
      expect(result.systolic).toBe('120.5');
      expect(result.diastolic).toBe('80.3');
      expect(result.pulse).toBe('75.7');
    });
  });

  describe('readingToFormValues', () => {
    it('Given a valid reading, when converting to form values, then it should return form values with numbers', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: '80',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = readingToFormValues(reading);

      // Assert
      expect(result).toEqual({
        sys: 120,
        dia: 80,
        ppm: 75,
      });
    });

    it('Given null reading, when converting to form values, then it should return null', () => {
      // Arrange
      const reading = null;

      // Act
      const result = readingToFormValues(reading);

      // Assert
      expect(result).toBeNull();
    });

    it('Given reading with invalid systolic value, when converting to form values, then it should return null', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: 'invalid',
        diastolic: '80',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = readingToFormValues(reading);

      // Assert
      expect(result).toBeNull();
    });

    it('Given reading with invalid diastolic value, when converting to form values, then it should return null', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: 'invalid',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = readingToFormValues(reading);

      // Assert
      expect(result).toBeNull();
    });

    it('Given reading with invalid pulse value, when converting to form values, then it should return null', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: '80',
        pulse: 'invalid',
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = readingToFormValues(reading);

      // Assert
      expect(result).toBeNull();
    });

    it('Given reading with empty string values, when converting to form values, then it should convert empty string to zero', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '',
        diastolic: '80',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = readingToFormValues(reading);

      // Assert
      // Note: Number('') returns 0, which is valid
      expect(result).toEqual({
        sys: 0,
        dia: 80,
        ppm: 75,
      });
    });
  });

  describe('readingToRecord', () => {
    it('Given a valid reading, when converting to record, then it should return a record with numbers', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: '80',
        pulse: '75',
        createdAt: '2024-01-17T10:00:00.000Z',
      };

      // Act
      const result = readingToRecord(reading);

      // Assert
      expect(result).toEqual({
        sys: 120,
        dia: 80,
        ppm: 75,
        createdAt: expect.any(String),
      });
      expect(new Date(result.createdAt).toString()).not.toBe('Invalid Date');
    });

    it('Given reading with invalid systolic, when converting to record, then it should throw an error', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: 'invalid',
        diastolic: '80',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act & Assert
      expect(() => readingToRecord(reading)).toThrow(
        'Invalid numeric value provided. Cannot create record.',
      );
    });

    it('Given reading with invalid diastolic, when converting to record, then it should throw an error', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: 'invalid',
        pulse: '75',
        createdAt: new Date().toISOString(),
      };

      // Act & Assert
      expect(() => readingToRecord(reading)).toThrow(
        'Invalid numeric value provided. Cannot create record.',
      );
    });

    it('Given reading with invalid pulse, when converting to record, then it should throw an error', () => {
      // Arrange
      const reading: BloodPressureReading = {
        id: '123',
        systolic: '120',
        diastolic: '80',
        pulse: 'invalid',
        createdAt: new Date().toISOString(),
      };

      // Act & Assert
      expect(() => readingToRecord(reading)).toThrow(
        'Invalid numeric value provided. Cannot create record.',
      );
    });
  });

  describe('recordToReading', () => {
    it('Given a valid record, when converting to reading, then it should return a reading with formatted date', () => {
      // Arrange
      const record: BloodPressureRecordModel = {
        sys: 120,
        dia: 80,
        ppm: 75,
        createdAt: '2024-01-17T14:30:00.000Z',
      };

      // Act
      const result = recordToReading(record);

      // Assert
      expect(result).toEqual({
        id: '2024-01-17T14:30:00.000Z',
        systolic: '120',
        diastolic: '80',
        pulse: '75',
        createdAt: expect.any(String),
      });
      // Verify the date format matches expected pattern (hh:mm a-dd/MM/yyyy)
      expect(result.createdAt).toMatch(/\d{2}:\d{2} [AP]M-\d{2}\/\d{2}\/\d{4}/);
    });

    it('Given a record with specific timestamp, when converting to reading, then it should format the date correctly', () => {
      // Arrange
      const timestamp = '2024-01-17T14:30:00.000Z';
      const record: BloodPressureRecordModel = {
        sys: 120,
        dia: 80,
        ppm: 75,
        createdAt: timestamp,
      };

      // Act
      const result = recordToReading(record);

      // Assert
      const expectedFormattedDate = format(
        new Date(timestamp),
        'hh:mm a-dd/MM/yyyy',
      );
      expect(result.createdAt).toBe(expectedFormattedDate);
      expect(result.id).toBe(timestamp);
    });

    it('Given a record with decimal values, when converting to reading, then it should convert them to strings', () => {
      // Arrange
      const record: BloodPressureRecordModel = {
        sys: 120.5,
        dia: 80.3,
        ppm: 75.7,
        createdAt: new Date().toISOString(),
      };

      // Act
      const result = recordToReading(record);

      // Assert
      expect(result.systolic).toBe('120.5');
      expect(result.diastolic).toBe('80.3');
      expect(result.pulse).toBe('75.7');
    });
  });
});
