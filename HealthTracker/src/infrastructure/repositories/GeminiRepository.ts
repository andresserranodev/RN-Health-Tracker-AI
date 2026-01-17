import {BloodPressureReading} from '@domain/entities/BloodPressureReading';
import {IGeminiRepository} from '@domain/repositories/IGeminiRepository';
import geminiApiClient from '@infrastructure/api/geminiClient';
import {
  GeminiResponse,
  GeminiImagePressureBloodRequest,
} from '@infrastructure/api/geminiTypes';
import {MIME_TYPE, RESPONSE_MIME_TYPE} from '@shared/constants/apiConstants';
import {EXTRACT_BLOOD_PRESSURE_PROMPT} from '@shared/constants/geminiPrompts';

export const geminiRepository: IGeminiRepository = {
  getReadingsFromImage: async (
    imageBase64: string,
  ): Promise<BloodPressureReading> => {
    const requestBody: GeminiImagePressureBloodRequest = {
      contents: [
        {
          parts: [
            {
              text: EXTRACT_BLOOD_PRESSURE_PROMPT,
            },
            {
              inline_data: {
                mime_type: MIME_TYPE,
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        response_mime_type: RESPONSE_MIME_TYPE,
      },
    };

    try {
      const response = await geminiApiClient.post<GeminiResponse>(
        '',
        requestBody,
      );

      const firstCandidate = response.data.candidates[0];
      if (firstCandidate && firstCandidate.content.parts[0].text) {
        const rawText = firstCandidate.content.parts[0].text;

        // Extract JSON string from the triple backticks
        const jsonString = rawText.replace(/```json|```/g, '').trim();

        console.warn('Extracted JSON string:', jsonString);

        const parsedData: BloodPressureReading = JSON.parse(jsonString);
        return parsedData;
      }

      throw new Error('Could not parse a valid response from the API.');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get readings from image.');
    }
  },
};
