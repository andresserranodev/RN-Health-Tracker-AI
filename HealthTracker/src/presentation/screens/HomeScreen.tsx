import {Feather} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {StatusBar} from 'expo-status-bar';
import React, {useRef, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import BloodPressureForm from '@presentation/components/BloodPressureForm/BloodPressureForm';
import CameraModal from '@presentation/components/CameraModal';
import HistoryList from '@presentation/components/HistoryList';
import IconButton from '@presentation/components/IconButton';
import LoadingModal from '@presentation/components/LoadingModal';
import MetricRow from '@presentation/components/MetricRow';
import {useBloodPressureData} from '@presentation/hooks/useBloodPressureData';
import {useCameraHandler} from '@presentation/hooks/useCameraHandler';
import {usePDFExportHistory} from '@presentation/hooks/usePDFExportHistory';
import {useRecordForm} from '@presentation/hooks/useRecordForm';

import {styles} from './HomeScreen.styles';

export default function App() {
  const {
    bloodPressureReadings,
    lastBloodPressureReading,
    addBloodPressureReading,
    deleteBloodPressureReading,
  } = useBloodPressureData();
  const {exportRecord} = usePDFExportHistory();

  // Custom hooks for form handling
  const {isModalVisible, prefilledData, openForm, closeForm, handleFormSubmit} =
    useRecordForm(addBloodPressureReading);
  // Custom hook for camera handling
  const {
    isCameraVisible,
    isLoading,
    openCamera,
    closeCamera,
    handlePhotoTaken,
  } = useCameraHandler(openForm);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isModalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isModalVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && isModalVisible) {
        closeForm();
      }
    },
    [closeForm, isModalVisible],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior='close'
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Latest Entry</Text>

      {lastBloodPressureReading ? (
        <View style={styles.lastRecordContainer}>
          <MetricRow
            label='Created at:'
            value={lastBloodPressureReading.createdAt}
          />
          <MetricRow
            label='Systolic (SYS):'
            value={lastBloodPressureReading.systolic}
          />
          <MetricRow
            label='Diastolic (DIA):'
            value={lastBloodPressureReading.diastolic}
          />
          <MetricRow
            label='Pulse (PPM):'
            value={lastBloodPressureReading.pulse}
          />
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
          text='Camera'
          icon={<Feather name='camera' size={22} color='white' />}
        />
        <IconButton
          onPress={() => openForm()}
          text='Form'
          icon={
            <MaterialCommunityIcons
              name='square-edit-outline'
              size={22}
              color='white'
            />
          }
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['50%']}
        onChange={handleSheetChanges}
        keyboardBehavior='interactive'
        backdropComponent={renderBackdrop}>
        <BloodPressureForm
          initialValues={prefilledData}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      </BottomSheetModal>
      <CameraModal
        visible={isCameraVisible}
        onClose={closeCamera}
        onPhotoTaken={handlePhotoTaken}
      />
      <Text style={styles.title}>History</Text>
      <View style={styles.exportButtonContainer}>
        {lastBloodPressureReading && (
          <View style={styles.exportButtonContainer}>
            <IconButton
              onPress={() => exportRecord(bloodPressureReadings)}
              text='Export Last Record as PDF'
              icon={
                <MaterialCommunityIcons
                  name='file-pdf-box'
                  size={22}
                  color='white'
                />
              }
            />
          </View>
        )}
      </View>
      <HistoryList
        readings={bloodPressureReadings}
        onDelete={deleteBloodPressureReading}
      />
      <StatusBar style='auto' />
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
}
