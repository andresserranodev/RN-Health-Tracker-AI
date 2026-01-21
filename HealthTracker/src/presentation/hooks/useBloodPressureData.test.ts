// src/presentation/hooks/useBloodPressureData.test.ts
import {renderHook, act} from '@testing-library/react-native';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {deleteBloodPressureRecordUseCase} from '@domain/use-cases/deleteBloodPressureRecord';
import {getAllBloodPressureReadingsUseCase} from '@domain/use-cases/getAllBloodPressureReadings';
import {saveBloodPressureRecordUseCase} from '@domain/use-cases/saveBloodPressure';
import {formValuesToReading} from '@infrastructure/mappers/BloodPressureMapper';

import {useBloodPressureData} from './useBloodPressureData';

// Mock the use cases
jest.mock('@domain/use-cases/getAllBloodPressureReadings');
jest.mock('@domain/use-cases/saveBloodPressure');
jest.mock('@domain/use-cases/deleteBloodPressureRecord');
jest.mock('@infrastructure/mappers/BloodPressureMapper');

const mockGetAllBloodPressureReadingsUseCase =
  getAllBloodPressureReadingsUseCase as jest.MockedFunction<
    typeof getAllBloodPressureReadingsUseCase
  >;
const mockSaveBloodPressureRecordUseCase =
  saveBloodPressureRecordUseCase as jest.MockedFunction<
    typeof saveBloodPressureRecordUseCase
  >;
const mockDeleteBloodPressureRecordUseCase =
  deleteBloodPressureRecordUseCase as jest.MockedFunction<
    typeof deleteBloodPressureRecordUseCase
  >;
const mockFormValuesToReading = formValuesToReading as jest.MockedFunction<
  typeof formValuesToReading
>;

describe('useBloodPressureData', () => {
  const mockReading1: BloodPressureReading = {
    id: '1',
    systolic: 120,
    diastolic: 80,
    pulse: 70,
    timestamp: new Date('2026-01-20T10:00:00Z'),
  };

  const mockReading2: BloodPressureReading = {
    id: '2',
    systolic: 130,
    diastolic: 85,
    pulse: 75,
    timestamp: new Date('2026-01-19T10:00:00Z'),
  };

  const mockFormValues: BloodPressureFormValues = {
    systolic: '140',
    diastolic: '90',
    pulse: '80',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('Given the hook is initialized, when it mounts, then it should load all blood pressure readings', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([
        mockReading1,
        mockReading2,
      ]);

      // Act
      const {result} = renderHook(() => useBloodPressureData());

      // Assert
      expect(mockGetAllBloodPressureReadingsUseCase).toHaveBeenCalledTimes(1);
      expect(result.current.bloodPressureReadings).toEqual([
        mockReading1,
        mockReading2,
      ]);
    });

    it('Given the hook is initialized, when there are no readings, then it should return an empty array', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([]);

      // Act
      const {result} = renderHook(() => useBloodPressureData());

      // Assert
      expect(result.current.bloodPressureReadings).toEqual([]);
    });
  });

  describe('Last Blood Pressure Reading', () => {
    it('Given there are multiple readings, when the hook renders, then it should return the first reading as the latest', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([
        mockReading1,
        mockReading2,
      ]);

      // Act
      const {result} = renderHook(() => useBloodPressureData());

      // Assert
      expect(result.current.lastBloodPressureReading).toEqual(mockReading1);
    });

    it('Given there are no readings, when the hook renders, then it should return null as the latest reading', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([]);

      // Act
      const {result} = renderHook(() => useBloodPressureData());

      // Assert
      expect(result.current.lastBloodPressureReading).toBeNull();
    });

    it('Given there is only one reading, when the hook renders, then it should return that reading as the latest', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([mockReading1]);

      // Act
      const {result} = renderHook(() => useBloodPressureData());

      // Assert
      expect(result.current.lastBloodPressureReading).toEqual(mockReading1);
    });
  });

  describe('Add Blood Pressure Reading', () => {
    it('Given valid form data, when addBloodPressureReading is called, then it should save the reading and refresh the list', () => {
      // Arrange
      const mockMappedReading: BloodPressureReading = {
        id: '3',
        systolic: 140,
        diastolic: 90,
        pulse: 80,
        timestamp: new Date('2026-01-20T12:00:00Z'),
      };

      mockGetAllBloodPressureReadingsUseCase
        .mockReturnValueOnce([mockReading1])
        .mockReturnValueOnce([mockMappedReading, mockReading1]);

      mockFormValuesToReading.mockReturnValue(mockMappedReading);

      const {result} = renderHook(() => useBloodPressureData());

      // Act
      act(() => {
        result.current.addBloodPressureReading(mockFormValues);
      });

      // Assert
      expect(mockFormValuesToReading).toHaveBeenCalledWith(mockFormValues);
      expect(mockSaveBloodPressureRecordUseCase).toHaveBeenCalledWith(
        mockMappedReading,
      );
      expect(mockGetAllBloodPressureReadingsUseCase).toHaveBeenCalledTimes(2); // Once on mount, once after save
      expect(result.current.bloodPressureReadings).toEqual([
        mockMappedReading,
        mockReading1,
      ]);
    });

    it('Given a new reading is added, when the list is refreshed, then the lastBloodPressureReading should update', () => {
      // Arrange
      const mockNewReading: BloodPressureReading = {
        id: '3',
        systolic: 140,
        diastolic: 90,
        pulse: 80,
        timestamp: new Date('2026-01-20T12:00:00Z'),
      };

      mockGetAllBloodPressureReadingsUseCase
        .mockReturnValueOnce([mockReading1])
        .mockReturnValueOnce([mockNewReading, mockReading1]);

      mockFormValuesToReading.mockReturnValue(mockNewReading);

      const {result} = renderHook(() => useBloodPressureData());

      expect(result.current.lastBloodPressureReading).toEqual(mockReading1);

      // Act
      act(() => {
        result.current.addBloodPressureReading(mockFormValues);
      });

      // Assert
      expect(result.current.lastBloodPressureReading).toEqual(mockNewReading);
    });
  });

  describe('Delete Blood Pressure Reading', () => {
    it('Given a reading ID, when deleteBloodPressureReading is called, then it should delete the reading and refresh the list', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase
        .mockReturnValueOnce([mockReading1, mockReading2])
        .mockReturnValueOnce([mockReading2]);

      const {result} = renderHook(() => useBloodPressureData());

      expect(result.current.bloodPressureReadings).toHaveLength(2);

      // Act
      act(() => {
        result.current.deleteBloodPressureReading('1');
      });

      // Assert
      expect(mockDeleteBloodPressureRecordUseCase).toHaveBeenCalledWith('1');
      expect(mockGetAllBloodPressureReadingsUseCase).toHaveBeenCalledTimes(2); // Once on mount, once after delete
      expect(result.current.bloodPressureReadings).toEqual([mockReading2]);
    });

    it('Given the last reading is deleted, when the list is refreshed, then lastBloodPressureReading should be null', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase
        .mockReturnValueOnce([mockReading1])
        .mockReturnValueOnce([]);

      const {result} = renderHook(() => useBloodPressureData());

      expect(result.current.lastBloodPressureReading).toEqual(mockReading1);

      // Act
      act(() => {
        result.current.deleteBloodPressureReading('1');
      });

      // Assert
      expect(result.current.lastBloodPressureReading).toBeNull();
      expect(result.current.bloodPressureReadings).toEqual([]);
    });
  });

  describe('Callback Stability', () => {
    it('Given the hook is rendered multiple times, when no dependencies change, then callback references should remain stable', () => {
      // Arrange
      mockGetAllBloodPressureReadingsUseCase.mockReturnValue([mockReading1]);

      const {result, rerender} = renderHook(() => useBloodPressureData());

      const firstAddCallback = result.current.addBloodPressureReading;
      const firstDeleteCallback = result.current.deleteBloodPressureReading;

      // Act
      rerender();

      // Assert
      expect(result.current.addBloodPressureReading).toBe(firstAddCallback);
      expect(result.current.deleteBloodPressureReading).toBe(
        firstDeleteCallback,
      );
    });
  });

  describe('Memoization', () => {
    it('Given the readings array reference changes but content is the same, when the hook re-renders, then lastBloodPressureReading should update', () => {
      // Arrange
      const reading1Copy = {...mockReading1};
      mockGetAllBloodPressureReadingsUseCase
        .mockReturnValueOnce([mockReading1])
        .mockReturnValueOnce([reading1Copy]);

      const {result} = renderHook(() => useBloodPressureData());

      const firstLastReading = result.current.lastBloodPressureReading;

      // Act
      act(() => {
        result.current.addBloodPressureReading(mockFormValues);
      });

      // Assert
      expect(result.current.lastBloodPressureReading).toEqual(firstLastReading);
    });
  });
});
