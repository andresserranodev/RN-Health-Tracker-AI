import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
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
import { extractReadingsFromImageUseCase } from "../../src/domain/usecase/extractReadingsFromImageUseCase";
import { toFormValues } from "../../feature/BloodPressureForm/bloodPressureMapper";

// Hooks
import { useRecordForm } from "./useRecordForm";
import { useCameraHandler } from "./useCameraHandler";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [lastRecord, setLastRecord] = useState<BloodPressureFormValues | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [prefilledData, setPrefilledData] = useState<
    BloodPressureFormValues | undefined
  >(undefined);

  const handleOpenManualForm = () => {
    setPrefilledData(undefined);
    setModalVisible(true);
  };

  const handleFormSubmit = (data: BloodPressureFormValues) => {
    setLastRecord(data);
    setModalVisible(false);
  };

  const handlePhotoTaken = async (base64: string) => {
    console.log(`prosessing image...`);
    setIsLoading(true);
    try {
      const readings = await extractReadingsFromImageUseCase(base64);
      setPrefilledData(toFormValues(readings));
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not analyze the image.");
    } finally {
      setIsLoading(false);
    }
  };

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
          onPress={() => setCameraVisible(true)}
          text="Camera"
          icon={<Feather name="camera" size={22} color="white" />}
        />
        <IconButton
          onPress={() => handleOpenManualForm()}
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
              initialValues={prefilledData}
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
