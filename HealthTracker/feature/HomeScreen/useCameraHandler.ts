// src/features/Home/useCameraHandler.ts
import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { extractReadingsFromImageUseCase } from "../../src/domain/usecase/extractReadingsFromImageUseCase";
import { toFormValues } from "../BloodPressureForm/bloodPressureMapper";
import { BloodPressureFormValues } from "../BloodPressureForm/types";

export const useCameraHandler = (
  onDataExtracted: (data: BloodPressureFormValues) => void
) => {
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openCamera = useCallback(() => setCameraVisible(true), []);
  const closeCamera = useCallback(() => setCameraVisible(false), []);

  const handlePhotoTaken = useCallback(
    async (base64: string) => {
      setIsLoading(true);
      closeCamera();
      try {
        const readings = await extractReadingsFromImageUseCase(base64);
        onDataExtracted(toFormValues(readings)); // Llama al callback con los datos
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not analyze the image.");
      } finally {
        setIsLoading(false);
      }
    },
    [onDataExtracted, closeCamera]
  );

  return {
    isCameraVisible,
    isLoading,
    openCamera,
    closeCamera,
    handlePhotoTaken,
  };
};
