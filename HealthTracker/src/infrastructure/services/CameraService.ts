import {CameraView} from 'expo-camera';
import React from 'react';
import {Alert} from 'react-native';

export class CameraService {
  static async captureImage(
    cameraRef: React.RefObject<CameraView>,
  ): Promise<string | null> {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready');
      return null;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.8,
      });

      if (!photo?.base64) {
        throw new Error('No image data received');
      }

      return photo.base64;
    } catch (error) {
      console.error('Error capturing image:', error);
      Alert.alert('Error', 'Failed to capture image');
      return null;
    }
  }
}
