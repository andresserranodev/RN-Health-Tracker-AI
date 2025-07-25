import geminiApiClient from "../../api/geminiApiClient";
import { EXTRACT_BLOOD_PRESSURE_PROMPT } from "../../constants/geminiPrompts";
import { GeminiResponse } from "../../api/types";
import { BloodPressureReading } from "../../domain/models/bloodPressureReading";

export const geminiRepository = {
  getReadingsFromImage: async (
    imageBase64: string
  ): Promise<BloodPressureReading> => {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: EXTRACT_BLOOD_PRESSURE_PROMPT,
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    };

    try {
      const response = await geminiApiClient.post<GeminiResponse>(
        "",
        requestBody
      );

      const firstCandidate = response.data.candidates[0];
      if (firstCandidate && firstCandidate.content.parts[0].text) {
        const jsonString = firstCandidate.content.parts[0].text;
        console.log("Response from Gemini:", jsonString);
        const parsedData: BloodPressureReading = JSON.parse(jsonString);
        return parsedData;
      }

      throw new Error("Could not parse a valid response from the API.");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to get readings from image.");
    }
  },
};
