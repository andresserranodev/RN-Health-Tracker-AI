import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useMemo, useCallback, forwardRef} from 'react';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';
import BloodPressureForm from '@presentation/components/BloodPressureForm/BloodPressureForm';

import {styles} from './styles';

interface BloodPressureBottomSheetProps {
  initialValues?: BloodPressureFormValues;
  onSubmit: (data: BloodPressureFormValues) => void;
  onClose: () => void;
}

const BloodPressureBottomSheet = forwardRef<
  BottomSheetModal,
  BloodPressureBottomSheetProps
>(({initialValues, onSubmit, onClose}, ref) => {
  // Snap points for the bottom sheet (Half sheet: roughly 50%, handling keyboard avoiding up to 80%)
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  // Backdrop component that dismisses the sheet when tapped
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior='close'
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBehavior='fillParent'
      keyboardBlurBehavior='restore'
      onDismiss={onClose}>
      <BottomSheetView style={styles.contentContainer}>
        <BloodPressureForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BloodPressureBottomSheet;
