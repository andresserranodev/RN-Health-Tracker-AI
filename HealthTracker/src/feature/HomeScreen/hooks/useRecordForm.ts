import {useState, useCallback} from 'react';

import {BloodPressureFormValues} from '../../BloodPressureForm/types';
/**
 * @description Custom hook to manage the state and actions for the blood pressure form modal.
 * It encapsulates the logic for modal visibility, pre-filled data, and form event handlers.
 *
 * @param {function(BloodPressureFormValues): void} onSave - A callback function that executes when the form is successfully submitted with valid data. It receives the form data as an argument.
 *
 * @returns {object} An object containing the state and handlers for the UI to consume.
 * @property {boolean} isModalVisible - State that determines if the form modal is visible.
 * @property {BloodPressureFormValues | undefined} prefilledData - Initial data to pre-populate the form fields.
 * @property {function(BloodPressureFormValues=): void} openForm - Function to open the form modal. Can optionally receive initial data.
 * @property {function(): void} closeForm - Function to close the form modal.
 * @property {function(BloodPressureFormValues): void} handleFormSubmit - Function to be passed to the form's `onSubmit` prop. It handles the `onSave` callback and closes the modal.
 *
 * @example
 * const { isModalVisible, prefilledData, openForm, closeForm, handleFormSubmit } = useRecordForm(setLastRecord);
 */
export const useRecordForm = (
  onSave: (data: BloodPressureFormValues) => void,
) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [prefilledData, setPrefilledData] = useState<
    BloodPressureFormValues | undefined
  >();

  const openForm = useCallback((initialData?: BloodPressureFormValues) => {
    setPrefilledData(initialData);
    setModalVisible(true);
  }, []);

  const closeForm = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleFormSubmit = useCallback(
    (data: BloodPressureFormValues) => {
      onSave(data);
      closeForm();
    },
    [onSave, closeForm],
  );

  return {
    isModalVisible,
    prefilledData,
    openForm,
    closeForm,
    handleFormSubmit,
  };
};
