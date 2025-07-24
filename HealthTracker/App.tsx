import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./components/IconButton";
import BloodPressureForm from "./feature/BloodPressureForm";
import { BloodPressureData } from "./feature/BloodPressureForm";
import CameraModal from "./components/CameraModal";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [lastRecord, setLastRecord] = useState<BloodPressureData | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handleFormSubmit = (data: BloodPressureData) => {
    setLastRecord(data);
    setModalVisible(false);
  };

  const handlePhotoTaken = (photoUri: string) => {
    setCapturedPhoto(photoUri);
    console.log('Photo captured:', photoUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pressure Blood Tracker!</Text>
      {lastRecord && (
        <View style={styles.lastRecordContainer}>
          <Text style={styles.lastRecordText}>
            Last Record: SYS: {lastRecord.sys}, DIA: {lastRecord.dia}, PPM:{" "}
            {lastRecord.ppm}
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <IconButton
          onPress={() => setModalVisible(true)}
          text="Form"
          icon={
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={22}
              color="white"
            />
          }
        />
        <IconButton
          onPress={() => setCameraVisible(true)}
          text="Camera"
          icon={<Feather name="camera" size={22} color="white" />}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <BloodPressureForm
              onSubmit={handleFormSubmit}
              onClose={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <CameraModal
        visible={isCameraVisible}
        onClose={() => setCameraVisible(false)}
        onPhotoTaken={handlePhotoTaken}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}
