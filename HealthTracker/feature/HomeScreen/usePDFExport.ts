import { useCallback } from "react";
import { Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { BloodPressureFormValues } from "../BloodPressureForm/types";

export const usePDFExport = () => {
  const exportRecord = useCallback(async (record: BloodPressureFormValues) => {
    if (!record) {
      Alert.alert("No Data", "There is no record to export.");
      return;
    }

    const htmlContent = `
    <html>
      <body>
        <h1>Blood Pressure Log</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <table class="metric-table">
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Systolic (SYS)</td>
            <td>${record.sys}</td>
          </tr>
          <tr>
            <td>Diastolic (DIA)</td>
            <td>${record.dia}</td>
          </tr>
          <tr>
            <td>Pulse (PPM)</td>
            <td>${record.ppm}</td>
          </tr>
        </table>
      </body>
    </html>
  `;
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      console.log("PDF generated with Expo Print at:", uri);

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share your blood pressure log",
      });
    } catch (error) {
      console.error("Error during PDF export:", error);
      Alert.alert("Error", "An error occurred while exporting the PDF.");
    }
  }, []);
  return {
    exportRecord,
  };
};
