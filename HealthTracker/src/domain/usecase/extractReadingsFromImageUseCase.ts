import {geminiRepository} from '../../data/repositories/geminiRepository';
import {BloodPressureReading} from '../models/bloodPressureReading';

/**
 * Extracts blood pressure readings from a given image in Base64 format.
 *
 * @param imageBase64 - The Base64-encoded string representation of the image.
 *                       Must be a valid string with a minimum length of 100 characters.
 * @returns A promise that resolves to a `BloodPressureReading` object containing the extracted readings.
 * @throws An error if the provided image data is invalid or insufficient.
 */
export const extractReadingsFromImageUseCase = async (
  imageBase64: string,
): Promise<BloodPressureReading> => {
  if (!imageBase64 || imageBase64.length < 100) {
    throw new Error('Invalid image data provided.');
  }
  return await geminiRepository.getReadingsFromImage(imageBase64);
};
