import geminiApiClient from '../../api/geminiApiClient';
import {GeminiResponse, GeminiImagePressureBloodRequest} from '../../api/types';
import {EXTRACT_BLOOD_PRESSURE_PROMPT} from '../../constants/geminiPrompts';
import {MIME_TYPE, RESPONSE_MODALITIES} from '../../constants/requestBody';
import {BloodPressureReading} from '../../domain/models/bloodPressureReading';

export const geminiRepository = {
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
        responseModalities: RESPONSE_MODALITIES,
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
