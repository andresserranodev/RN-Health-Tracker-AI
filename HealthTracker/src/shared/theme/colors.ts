/**
 * Color palette for the Health Tracker application
 */
export const colors = {
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Primary colors
  primary: '#007AFF',

  // Neutral colors
  neutral: {
    50: '#F7F7F7',
    100: '#f5f5f5',
    200: '#f0f0f0',
    300: '#f9f9f9',
    400: '#ddd',
    500: '#CCC',
    600: '#888',
    700: '#666',
    800: '#333',
    900: '#1C1C1E',
  },

  // Error colors
  error: 'red',

  // Shadow colors
  shadow: '#000',

  // Overlay colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.5)',
    medium: 'rgba(0, 0, 0, 0.6)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },

  // Background colors
  background: {
    primary: '#f5f5f5',
    secondary: '#F7F7F7',
    white: 'white',
    black: 'black',
  },

  // Border colors
  border: {
    default: '#ddd',
    light: '#CCC',
    error: 'red',
    white: 'rgba(255, 255, 255, 0.3)',
  },

  // Button colors
  button: {
    primary: '#007AFF',
    secondary: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

export type Colors = typeof colors;
