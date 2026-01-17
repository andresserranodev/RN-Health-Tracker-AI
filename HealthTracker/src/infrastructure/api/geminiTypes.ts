export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface TextPart {
  text: string;
}

interface InlineDataPart {
  inline_data: {
    mime_type: string;
    data: string;
  };
}

export interface GeminiImagePressureBloodRequest {
  contents: {
    parts: (TextPart | InlineDataPart)[];
  }[];
  generationConfig?: {
    response_mime_type: string;
  };
}
