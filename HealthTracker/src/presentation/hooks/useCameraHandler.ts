import {useState, useCallback} from 'react';
import {Alert} from 'react-native';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import {extractReadingsFromImageUseCase} from '@domain/use-cases/extractReadingsFromImage';
import {readingToFormValues} from '@infrastructure/mappers/BloodPressureMapper';
/**
 * @description Custom hook to manage the state and logic for the camera feature.
 * It handles the camera modal's visibility, the loading state during image processing,
 * and the flow of extracting data from a photo.
 *
 * @param {function(BloodPressureFormValues): void} onDataExtracted - A callback function that is executed after an image is successfully analyzed. It receives the extracted data, ready to be used (e.g., to pre-fill a form).
 *
 * @returns {object} An object containing the state and handlers for the camera UI.
 * @property {boolean} isCameraVisible - State that determines if the camera modal is visible.
 * @property {boolean} isLoading - State that indicates if an image is currently being processed.
 * @property {function(): void} openCamera - Function to open the camera modal.
 * @property {function(): void} closeCamera - Function to close the camera modal.
 * @property {function(string): Promise<void>} handlePhotoTaken - Async function to process the captured photo's base64 string, extract data, and call `onDataExtracted`.
 *
 * @example
 * const { isCameraVisible, isLoading, openCamera, closeCamera, handlePhotoTaken } = useCameraHandler(openForm);
 */
export const useCameraHandler = (
  onDataExtracted: (data: BloodPressureFormValues) => void,
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
        const formValues = readingToFormValues(readings);
        if (formValues) {
          onDataExtracted(formValues);
        } else {
          Alert.alert(
            'Error',
            'Could not extract valid readings from the image.',
          );
        }
      } catch (error) {
        console.error('Image analysis error:', error);
        Alert.alert('Error', 'Could not analyze the image.');
      } finally {
        setIsLoading(false);
      }
    },
    [onDataExtracted, closeCamera],
  );

  return {
    isCameraVisible,
    isLoading,
    openCamera,
    closeCamera,
    handlePhotoTaken,
  };
};
