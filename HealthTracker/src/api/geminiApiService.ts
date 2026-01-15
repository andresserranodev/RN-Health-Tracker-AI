import {ApiError} from '../domain/errors/appError';

import geminiApiClient from './geminiApiClient';

export const geminiApiService = {
  postToGenerateContent: async (requestBody: unknown): Promise<unknown> => {
    try {
      const response = await geminiApiClient.post('', requestBody);
      return response.data;
    } catch (error) {
      let errorMessage = 'An unknown API error occurred.';

      if (
        error &&
        typeof error === 'object' &&
        'isAxiosError' in error &&
        error.isAxiosError
      ) {
        const axiosError = error as {response?: {status?: number}};
        const status = axiosError.response?.status;
        errorMessage = `API request failed with status ${status || 'unknown'}.`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Throw our custom error
      throw new ApiError(errorMessage);
    }
  },
};
