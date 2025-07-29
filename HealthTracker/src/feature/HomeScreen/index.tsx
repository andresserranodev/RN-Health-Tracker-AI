import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
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
import BloodPressureForm from "../BloodPressureForm";
import CameraModal from "../../components/CameraModal";
import HistoryList from "../../components/HistoryList";

// Hooks
import { useRecordForm } from "./hooks/useRecordForm";
import { useCameraHandler } from "./hooks/useCameraHandler";
import { useBloodPressureData } from './hooks/useBloodPressureData';


export default function App() {

  const { readings, lastReading, addReading } = useBloodPressureData();

  // Custom hooks for form handling
  const {
    isModalVisible,
    prefilledData,
    openForm,
    closeForm,
    handleFormSubmit,
  } = useRecordForm(addReading);
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

      {lastReading ? (
        <View style={styles.lastRecordContainer}>
          <MetricRow label="Created at:" value={lastReading.createdAt} />
          <MetricRow label="Systolic (SYS):" value={lastReading.systolic} />
          <MetricRow label="Diastolic (DIA):" value={lastReading.diastolic} />
          <MetricRow label="Pulse (PPM):" value={lastReading.pulse} />
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
          onPress={() => openCamera()}
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
      <HistoryList readings={readings} />
      <StatusBar style="auto" />
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
}
