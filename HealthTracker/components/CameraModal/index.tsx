import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken?: (photoUri: string) => void;
}

export default function CameraModal({ visible, onClose, onPhotoTaken }: CameraModalProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.permissionContainer}>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionText}>
              We need your permission to show the camera
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        if (photo) {
          setCapturedPhoto(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
        console.error('Camera error:', error);
      }
    }
  };

  const savePhoto = () => {
    if (capturedPhoto && onPhotoTaken) {
      onPhotoTaken(capturedPhoto);
    }
    setCapturedPhoto(null);
    onClose();
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const handleClose = () => {
    setCapturedPhoto(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.container}>
        {capturedPhoto ? (
          // Photo preview screen
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
            <View style={styles.previewControls}>
              <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
                <Feather name="rotate-ccw" size={24} color="white" />
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
                <Feather name="check" size={24} color="white" />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButtonTop} onPress={handleClose}>
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          // Camera view
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.closeButtonTop} onPress={handleClose}>
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
              
              <View style={styles.bottomControls}>
                <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                  <Feather name="rotate-cw" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
                <View style={styles.placeholder} />
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
