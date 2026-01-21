// src/presentation/hooks/usePDFExportHistory.test.ts
import {renderHook, act} from '@testing-library/react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {Alert} from 'react-native';

import {BloodPressureReading} from '@domain/entities/BloodPressureReading';

import {usePDFExportHistory} from './usePDFExportHistory';

// Mock expo-print
jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn(),
}));

// Mock expo-sharing
jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn(),
}));

// Mock react-native Alert
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockPrintToFileAsync = Print.printToFileAsync as jest.MockedFunction<
  typeof Print.printToFileAsync
>;
const mockIsAvailableAsync = Sharing.isAvailableAsync as jest.MockedFunction<
  typeof Sharing.isAvailableAsync
>;
const mockShareAsync = Sharing.shareAsync as jest.MockedFunction<
  typeof Sharing.shareAsync
>;
const mockAlert = Alert.alert as jest.MockedFunction<typeof Alert.alert>;

describe('usePDFExportHistory', () => {
  const mockReading1: BloodPressureReading = {
    id: '1',
    systolic: '120',
    diastolic: '80',
    pulse: '70',
    createdAt: '2026-01-20 10:00 AM',
  };

  const mockReading2: BloodPressureReading = {
    id: '2',
    systolic: '130',
    diastolic: '85',
    pulse: '75',
    createdAt: '2026-01-19 09:00 AM',
  };

  const mockReading3: BloodPressureReading = {
    id: '3',
    systolic: '140',
    diastolic: '90',
    pulse: '80',
    createdAt: '2026-01-18 08:00 AM',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.warn and console.error in tests
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('Given the hook is initialized, when it mounts, then it should return exportRecord function', () => {
      // Act
      const {result} = renderHook(() => usePDFExportHistory());

      // Assert
      expect(result.current.exportRecord).toBeDefined();
      expect(typeof result.current.exportRecord).toBe('function');
    });
  });

  describe('Export Record - No Data', () => {
    it('Given records array is falsy, when exportRecord is called with null-like value, then it should show an alert and not generate PDF', async () => {
      // Arrange
      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        // @ts-expect-error - Testing edge case with null
        await result.current.exportRecord(null);
      });

      // Assert
      expect(mockAlert).toHaveBeenCalledWith(
        'No Data',
        'There is no record to export.',
      );
      expect(mockPrintToFileAsync).not.toHaveBeenCalled();
      expect(mockShareAsync).not.toHaveBeenCalled();
    });

    it('Given records array is empty, when exportRecord is called, then it should still generate PDF with empty table', async () => {
      // Arrange
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockResolvedValue(undefined);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([]);
      });

      // Assert
      // Empty array is truthy, so it should proceed with PDF generation
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockAlert).not.toHaveBeenCalled();
    });
  });

  describe('Export Record - Success', () => {
    it('Given valid records, when exportRecord is called and sharing is available, then it should generate and share PDF', async () => {
      // Arrange
      const mockUri = 'file:///path/to/pdf.pdf';
      mockPrintToFileAsync.mockResolvedValue({uri: mockUri, numberOfPages: 1});
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockResolvedValue(undefined);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1, mockReading2]);
      });

      // Assert
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockPrintToFileAsync).toHaveBeenCalledWith({
        html: expect.stringContaining('Blood Pressure History'),
      });

      // Verify HTML content contains table headers
      const htmlArg = mockPrintToFileAsync.mock.calls[0]?.[0]?.html;
      expect(htmlArg).toContain('Date');
      expect(htmlArg).toContain('Systolic (SYS)');
      expect(htmlArg).toContain('Diastolic (DIA)');
      expect(htmlArg).toContain('Pulse (PPM)');

      // Verify HTML content contains record data
      expect(htmlArg).toContain('2026-01-20 10:00 AM');
      expect(htmlArg).toContain('120');
      expect(htmlArg).toContain('80');
      expect(htmlArg).toContain('70');
      expect(htmlArg).toContain('2026-01-19 09:00 AM');
      expect(htmlArg).toContain('130');
      expect(htmlArg).toContain('85');
      expect(htmlArg).toContain('75');

      expect(console.warn).toHaveBeenCalledWith(
        'PDF generated with Expo Print at:',
        mockUri,
      );

      expect(mockIsAvailableAsync).toHaveBeenCalledTimes(1);

      expect(mockShareAsync).toHaveBeenCalledTimes(1);
      expect(mockShareAsync).toHaveBeenCalledWith(mockUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share your blood pressure log',
      });

      expect(mockAlert).not.toHaveBeenCalled();
    });

    it('Given multiple records, when exportRecord is called, then all records should be included in the PDF', async () => {
      // Arrange
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockResolvedValue(undefined);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([
          mockReading1,
          mockReading2,
          mockReading3,
        ]);
      });

      // Assert
      const htmlArg = mockPrintToFileAsync.mock.calls[0]?.[0]?.html;

      // Verify all three records are in the HTML
      expect(htmlArg).toContain('2026-01-20 10:00 AM');
      expect(htmlArg).toContain('2026-01-19 09:00 AM');
      expect(htmlArg).toContain('2026-01-18 08:00 AM');
      expect(htmlArg).toContain('140');
      expect(htmlArg).toContain('90');
    });

    it('Given a single record, when exportRecord is called, then it should generate PDF with that record', async () => {
      // Arrange
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockResolvedValue(undefined);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      const htmlArg = mockPrintToFileAsync.mock.calls[0]?.[0]?.html;
      expect(htmlArg).toContain('2026-01-20 10:00 AM');
      expect(htmlArg).toContain('120');
      expect(htmlArg).toContain('80');
      expect(htmlArg).toContain('70');

      // Should not contain other records
      expect(htmlArg).not.toContain('2026-01-19 09:00 AM');
      expect(htmlArg).not.toContain('2026-01-18 08:00 AM');
    });
  });

  describe('Export Record - Sharing Not Available', () => {
    it('Given sharing is not available on the device, when exportRecord is called, then it should show an error alert', async () => {
      // Arrange
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(false);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockIsAvailableAsync).toHaveBeenCalledTimes(1);
      expect(mockShareAsync).not.toHaveBeenCalled();

      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        'Sharing is not available on this device.',
      );
    });
  });

  describe('Export Record - Error Handling', () => {
    it('Given PDF generation fails, when exportRecord is called, then it should show an error alert', async () => {
      // Arrange
      const mockError = new Error('PDF generation failed');
      mockPrintToFileAsync.mockRejectedValue(mockError);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        'Error during PDF export:',
        mockError,
      );
      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while exporting the PDF.',
      );
      expect(mockShareAsync).not.toHaveBeenCalled();
    });

    it('Given sharing fails, when exportRecord is called, then it should show an error alert', async () => {
      // Arrange
      const mockError = new Error('Sharing failed');
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockRejectedValue(mockError);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockIsAvailableAsync).toHaveBeenCalledTimes(1);
      expect(mockShareAsync).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        'Error during PDF export:',
        mockError,
      );
      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while exporting the PDF.',
      );
    });

    it('Given isAvailableAsync throws an error, when exportRecord is called, then it should show an error alert', async () => {
      // Arrange
      const mockError = new Error('Sharing check failed');
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockRejectedValue(mockError);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      expect(mockPrintToFileAsync).toHaveBeenCalledTimes(1);
      expect(mockIsAvailableAsync).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        'Error during PDF export:',
        mockError,
      );
      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while exporting the PDF.',
      );
    });
  });

  describe('Callback Stability', () => {
    it('Given the hook is rendered multiple times, when no dependencies change, then exportRecord reference should remain stable', () => {
      // Arrange
      const {result, rerender} = renderHook(() => usePDFExportHistory());

      const firstExportRecord = result.current.exportRecord;

      // Act
      rerender({});

      // Assert
      expect(result.current.exportRecord).toBe(firstExportRecord);
    });

    it('Given multiple rerenders, when the hook is called, then exportRecord should maintain reference equality', () => {
      // Arrange
      const {result, rerender} = renderHook(() => usePDFExportHistory());

      const initialRef = result.current.exportRecord;

      // Act
      rerender({});
      rerender({});
      rerender({});

      // Assert
      expect(result.current.exportRecord).toBe(initialRef);
    });
  });

  describe('HTML Generation', () => {
    it('Given records are provided, when exportRecord is called, then the generated HTML should have proper structure', async () => {
      // Arrange
      mockPrintToFileAsync.mockResolvedValue({
        uri: 'file:///test.pdf',
        numberOfPages: 1,
      });
      mockIsAvailableAsync.mockResolvedValue(true);
      mockShareAsync.mockResolvedValue(undefined);

      const {result} = renderHook(() => usePDFExportHistory());

      // Act
      await act(async () => {
        await result.current.exportRecord([mockReading1]);
      });

      // Assert
      const htmlArg = mockPrintToFileAsync.mock.calls[0]?.[0]?.html;

      // Verify HTML structure
      expect(htmlArg).toContain('<html>');
      expect(htmlArg).toContain('</html>');
      expect(htmlArg).toContain('<head>');
      expect(htmlArg).toContain('<style>');
      expect(htmlArg).toContain('</style>');
      expect(htmlArg).toContain('<body>');
      expect(htmlArg).toContain('</body>');
      expect(htmlArg).toContain('<h1>Blood Pressure History</h1>');
      expect(htmlArg).toContain('<table class="report-table">');
      expect(htmlArg).toContain('<thead>');
      expect(htmlArg).toContain('<tbody>');

      // Verify table headers
      expect(htmlArg).toContain('<th>Date</th>');
      expect(htmlArg).toContain('<th>Systolic (SYS)</th>');
      expect(htmlArg).toContain('<th>Diastolic (DIA)</th>');
      expect(htmlArg).toContain('<th>Pulse (PPM)</th>');

      // Verify CSS styling
      expect(htmlArg).toContain('font-family: Arial, sans-serif');
      expect(htmlArg).toContain('border-collapse: collapse');
    });
  });
});
