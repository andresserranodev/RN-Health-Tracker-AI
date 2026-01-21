import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {useCallback} from 'react';
import {Alert} from 'react-native';

import {BloodPressureReading} from '@domain/entities/BloodPressureReading';

export const usePDFExportHistory = () => {
  const exportRecord = useCallback(async (records: BloodPressureReading[]) => {
    if (!records) {
      Alert.alert('No Data', 'There is no record to export.');
      return;
    }

    const tableRows = records
      .map(
        record => `
        <tr>
          <td>${record.createdAt}</td>
          <td>${record.systolic}</td>
          <td>${record.diastolic}</td>
          <td>${record.pulse}</td>
        </tr>
      `,
      )
      .join('');

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .report-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .report-table th, .report-table td { border: 1px solid #ddd; padding: 8px; font-size: 14px; }
            .report-table th { background-color: #f2f2f2; text-align: left; }
          </style>
        </head>
        <body>
          <h1>Blood Pressure History</h1>
          <table class="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Systolic (SYS)</th>
                <th>Diastolic (DIA)</th>
                <th>Pulse (PPM)</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    try {
      const {uri} = await Print.printToFileAsync({
        html: htmlContent,
      });

      console.warn('PDF generated with Expo Print at:', uri);

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device.');
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share your blood pressure log',
      });
    } catch (error) {
      console.error('Error during PDF export:', error);
      Alert.alert('Error', 'An error occurred while exporting the PDF.');
    }
  }, []);
  return {
    exportRecord,
  };
};
