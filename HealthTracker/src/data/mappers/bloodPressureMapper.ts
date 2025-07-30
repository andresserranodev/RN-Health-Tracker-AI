import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { BloodPressureRecordModel } from "../models/bloodPressureRecordModel";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";
import { format } from "date-fns";

export const toRecordModel = (
  formData: BloodPressureReading
): BloodPressureRecordModel => {
  const sysNum = Number(formData.systolic);
  const diaNum = Number(formData.diastolic);
  const ppmNum = Number(formData.pulse);

  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(ppmNum)) {
    throw new Error("Invalid numeric value provided. Cannot create record.");
  }
  return {
    id: uuidv4(),
    sys: sysNum,
    dia: diaNum,
    ppm: ppmNum,
    createdAt: new Date().toISOString(),
  };
};

export const toReadingUI = (
  recordModel: BloodPressureRecordModel
): BloodPressureReading => {
  const dateObject = new Date(recordModel.createdAt);
  const formattedDate = format(dateObject, "hh:mm a-dd/MM/yyyy");
  return {
    id: recordModel.id,
    systolic: recordModel.sys.toString(),
    diastolic: recordModel.dia.toString(),
    pulse: recordModel.ppm.toString(),
    createdAt: formattedDate,
  };
};
