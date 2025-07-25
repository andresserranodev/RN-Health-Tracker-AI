import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken?: (base64: string) => void;
}

interface CapturedPhoto {
  uri: string;
  base64: string;
}

export default function CameraModal({
  visible,
  onClose,
  onPhotoTaken,
}: CameraModalProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(
    null
  );

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
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestPermission}
            >
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
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const cameraOptions = {
          base64: true,
          shutterSound: false,
        };

        const photo = await cameraRef.current.takePictureAsync(cameraOptions);

        if (photo.uri && photo.base64) {
          setCapturedPhoto({
            uri: photo.uri,
            base64: photo.base64,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
        console.error("Camera error:", error);
      }
    }
  };

  const savePhoto = () => {
    if (capturedPhoto && onPhotoTaken) {
      onPhotoTaken(capturedPhoto.base64);
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
            <Image
              source={{ uri: capturedPhoto.uri }}
              style={styles.previewImage}
            />
            <View style={styles.previewControls}>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={retakePhoto}
              >
                <Feather name="rotate-ccw" size={24} color="white" />
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
                <Feather name="check" size={24} color="white" />
                <Text style={styles.buttonText}>Analyze</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButtonTop}
              onPress={handleClose}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          // Camera view
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={facing}
              ref={cameraRef}
              ratio="4:3" // TODO Adjust ratio when needed using a crop tool
            />
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.closeButtonTop}
                onPress={handleClose}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>

              <View style={styles.bottomControls}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Feather name="rotate-cw" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
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
