import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LoadingModal from "../../components/LoadingModal";
import MetricRow from "../../components/MetricRow";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../../components/IconButton";
import BloodPressureForm from "../../feature/BloodPressureForm";
import { BloodPressureFormValues } from "../../feature/BloodPressureForm/types";
import CameraModal from "../../components/CameraModal";

// Hooks
import { useRecordForm } from "./useRecordForm";
import { useCameraHandler } from "./useCameraHandler";

export default function App() {
  const [lastRecord, setLastRecord] = useState<BloodPressureFormValues | null>(
    null
  );
  // Custom hooks for form handling
  const {
    isModalVisible,
    prefilledData,
    openForm,
    closeForm,
    handleFormSubmit,
  } = useRecordForm(setLastRecord);
  // Custom hook for camera handling
  const {
    isCameraVisible,
    isLoading,
    openCamera,
    closeCamera,
    handlePhotoTaken,
  } = useCameraHandler(openForm);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Latest Entry</Text>
      {lastRecord ? (
        <View style={styles.lastRecordContainer}>
          <MetricRow label="Systolic (SYS):" value={lastRecord.sys} />
          <MetricRow label="Diastolic (DIA):" value={lastRecord.dia} />
          <MetricRow label="Pulse (PPM):" value={lastRecord.ppm} />
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            No entries yet. Add your first record using the buttons below!
          </Text>
        </View>
      )}
      <Text style={styles.title}>Add new register</Text>
      <View style={styles.buttonContainer}>
        <IconButton
          onPress={() => {
            openCamera;
          }}
          text="Camera"
          icon={<Feather name="camera" size={22} color="white" />}
        />
        <IconButton
          onPress={() => openForm()}
          text="Form"
          icon={
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={22}
              color="white"
            />
          }
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeForm}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <BloodPressureForm
              initialValues={prefilledData}
              onSubmit={handleFormSubmit}
              onClose={closeForm}
            />
          </View>
        </View>
      </Modal>
      <CameraModal
        visible={isCameraVisible}
        onClose={closeCamera}
        onPhotoTaken={handlePhotoTaken}
      />
      <Text style={styles.title}>History</Text>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Comming soon! This section will display your historical data.
        </Text>
      </View>
      <StatusBar style="auto" />
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
}
