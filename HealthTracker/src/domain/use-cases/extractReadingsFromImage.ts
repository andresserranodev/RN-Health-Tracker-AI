import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {IGeminiRepository} from '@domain/repositories/IGeminiRepository';
import {container} from '@infrastructure/di/Container';

/**
 * Extracts blood pressure readings from a given image in Base64 format.
 *
 * @param imageBase64 - The Base64-encoded string representation of the image.
 *                       Must be a valid string with a minimum length of 100 characters.
 * @returns A promise that resolves to a `BloodPressureReading` object containing the extracted readings.
 * @throws An error if the provided image data is invalid or insufficient.
 */
export const createExtractReadingsFromImageUseCase = (
  geminiRepository: IGeminiRepository,
) => {
  return async (imageBase64: string): Promise<BloodPressureReading> => {
    if (!imageBase64 || imageBase64.length < 100) {
      throw new Error('Invalid image data provided.');
    }
    return await geminiRepository.getReadingsFromImage(imageBase64);
  };
};

// Export singleton for convenience
export const extractReadingsFromImageUseCase =
  createExtractReadingsFromImageUseCase(container.geminiRepository);
