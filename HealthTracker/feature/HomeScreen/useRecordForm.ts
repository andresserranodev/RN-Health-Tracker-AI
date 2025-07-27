import { useState, useCallback } from "react";
import { BloodPressureFormValues } from "../BloodPressureForm/types";

export const useRecordForm = (
  onSave: (data: BloodPressureFormValues) => void
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
    [onSave, closeForm]
  );

  return {
    isModalVisible,
    prefilledData,
    openForm,
    closeForm,
    handleFormSubmit,
  };
};
