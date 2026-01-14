export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ProcessingError {
  title: string;
  message: string;
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64Data: string | null; // For API
  mimeType: string;
}

// Prompt constant to ensure consistency
export const PRODUCT_SHOT_PROMPT = `Extract the main product object from this image and place it on a pure white background. 
Strictly follow these rules:
1. Identify the single main product subject.
2. Remove the entire original background, props, text, and any surrounding clutter.
3. The output must be a clean product shot on a solid white background (#FFFFFF).
4. Do not crop the product; keep the entire product visible.`;
