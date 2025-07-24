import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./components/IconButton";
import BloodPressureForm from "./feature/BloodPressureForm";
import { BloodPressureData } from "./feature/BloodPressureForm";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [lastRecord, setLastRecord] = useState<BloodPressureData | null>(null);

  const handleFormSubmit = (data: BloodPressureData) => {
    setLastRecord(data);
    setModalVisible(false);
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
      <IconButton
        onPress={() => setModalVisible(true)}
        text="Open From"
        icon={
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={22}
            color="white"
          />
        }
      />
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
      <StatusBar style="auto" />
    </View>
  );
}
