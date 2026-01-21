// src/presentation/hooks/useRecordForm.test.ts
import {renderHook, act} from '@testing-library/react-native';

import {BloodPressureFormValues} from '@domain/entities/BloodPressureFormValues';

import {useRecordForm} from './useRecordForm';

describe('useRecordForm', () => {
  type HookProps = {onSave: (data: BloodPressureFormValues) => void};

  const mockOnSave = jest.fn();

  const mockFormValues: BloodPressureFormValues = {
    sys: 120,
    dia: 80,
    ppm: 70,
  };

  const mockPrefilledData: BloodPressureFormValues = {
    sys: 130,
    dia: 85,
    ppm: 75,
  };

  // Helper function to render the hook with proper typing
  const renderUseRecordForm = (
    onSave: (data: BloodPressureFormValues) => void = mockOnSave,
  ) => {
    return renderHook((props: HookProps) => useRecordForm(props.onSave), {
      initialProps: {onSave},
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('Given the hook is initialized, when it mounts, then it should have modal closed and no prefilled data', () => {
      // Act
      const {result} = renderUseRecordForm();

      // Assert
      expect(result.current.isModalVisible).toBe(false);
      expect(result.current.prefilledData).toBeUndefined();
    });

    it('Given the hook is initialized, when it mounts, then all functions should be defined', () => {
      // Act
      const {result} = renderUseRecordForm();

      // Assert
      expect(result.current.openForm).toBeDefined();
      expect(result.current.closeForm).toBeDefined();
      expect(result.current.handleFormSubmit).toBeDefined();
    });
  });

  describe('Opening Form', () => {
    it('Given the form is closed, when openForm is called without data, then the modal should open with no prefilled data', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      expect(result.current.isModalVisible).toBe(false);

      // Act
      act(() => {
        result.current.openForm();
      });

      // Assert
      expect(result.current.isModalVisible).toBe(true);
      expect(result.current.prefilledData).toBeUndefined();
    });

    it('Given the form is closed, when openForm is called with initial data, then the modal should open with prefilled data', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      expect(result.current.isModalVisible).toBe(false);
      expect(result.current.prefilledData).toBeUndefined();

      // Act
      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      // Assert
      expect(result.current.isModalVisible).toBe(true);
      expect(result.current.prefilledData).toEqual(mockPrefilledData);
    });

    it('Given the form is already open with data, when openForm is called with new data, then the prefilled data should be updated', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      expect(result.current.prefilledData).toEqual(mockPrefilledData);

      const newData: BloodPressureFormValues = {
        sys: 140,
        dia: 90,
        ppm: 80,
      };

      // Act
      act(() => {
        result.current.openForm(newData);
      });

      // Assert
      expect(result.current.isModalVisible).toBe(true);
      expect(result.current.prefilledData).toEqual(newData);
    });
  });

  describe('Closing Form', () => {
    it('Given the form is open, when closeForm is called, then the modal should close', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      expect(result.current.isModalVisible).toBe(true);

      // Act
      act(() => {
        result.current.closeForm();
      });

      // Assert
      expect(result.current.isModalVisible).toBe(false);
    });

    it('Given the form is open with prefilled data, when closeForm is called, then the modal should close but prefilled data should remain', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      expect(result.current.prefilledData).toEqual(mockPrefilledData);

      // Act
      act(() => {
        result.current.closeForm();
      });

      // Assert
      expect(result.current.isModalVisible).toBe(false);
      expect(result.current.prefilledData).toEqual(mockPrefilledData);
    });

    it('Given the form is already closed, when closeForm is called, then it should remain closed', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      expect(result.current.isModalVisible).toBe(false);

      // Act
      act(() => {
        result.current.closeForm();
      });

      // Assert
      expect(result.current.isModalVisible).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('Given the form is open, when handleFormSubmit is called, then it should call onSave and close the modal', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      act(() => {
        result.current.openForm();
      });

      expect(result.current.isModalVisible).toBe(true);

      // Act
      act(() => {
        result.current.handleFormSubmit(mockFormValues);
      });

      // Assert
      expect(mockOnSave).toHaveBeenCalledTimes(1);
      expect(mockOnSave).toHaveBeenCalledWith(mockFormValues);
      expect(result.current.isModalVisible).toBe(false);
    });

    it('Given the form has prefilled data, when handleFormSubmit is called, then it should call onSave with the submitted data and close the modal', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      // Act
      act(() => {
        result.current.handleFormSubmit(mockFormValues);
      });

      // Assert
      expect(mockOnSave).toHaveBeenCalledWith(mockFormValues);
      expect(result.current.isModalVisible).toBe(false);
    });

    it('Given handleFormSubmit is called multiple times, when each submission occurs, then onSave should be called each time', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      // Act - First submission
      act(() => {
        result.current.openForm();
        result.current.handleFormSubmit(mockFormValues);
      });

      expect(mockOnSave).toHaveBeenCalledTimes(1);

      // Act - Second submission
      act(() => {
        result.current.openForm();
        result.current.handleFormSubmit(mockPrefilledData);
      });

      // Assert
      expect(mockOnSave).toHaveBeenCalledTimes(2);
      expect(mockOnSave).toHaveBeenNthCalledWith(1, mockFormValues);
      expect(mockOnSave).toHaveBeenNthCalledWith(2, mockPrefilledData);
    });
  });

  describe('Callback Stability', () => {
    it('Given the hook is rendered multiple times, when no dependencies change, then callback references should remain stable', () => {
      // Arrange
      const {result, rerender} = renderUseRecordForm();

      const firstOpenForm = result.current.openForm;
      const firstCloseForm = result.current.closeForm;
      const firstHandleFormSubmit = result.current.handleFormSubmit;

      // Act
      rerender({onSave: mockOnSave});

      // Assert
      expect(result.current.openForm).toBe(firstOpenForm);
      expect(result.current.closeForm).toBe(firstCloseForm);
      expect(result.current.handleFormSubmit).toBe(firstHandleFormSubmit);
    });

    it('Given the onSave callback changes, when the hook re-renders, then handleFormSubmit reference should update', () => {
      // Arrange
      const {result, rerender} = renderUseRecordForm();

      const firstHandleFormSubmit = result.current.handleFormSubmit;

      const newMockOnSave = jest.fn();

      // Act
      rerender({onSave: newMockOnSave});

      // Assert
      expect(result.current.handleFormSubmit).not.toBe(firstHandleFormSubmit);
    });

    it('Given the onSave callback changes, when handleFormSubmit is called, then it should use the new callback', () => {
      // Arrange
      const {result, rerender} = renderUseRecordForm();

      const newMockOnSave = jest.fn();

      // Act
      rerender({onSave: newMockOnSave});

      act(() => {
        result.current.openForm();
        result.current.handleFormSubmit(mockFormValues);
      });

      // Assert
      expect(mockOnSave).not.toHaveBeenCalled();
      expect(newMockOnSave).toHaveBeenCalledTimes(1);
      expect(newMockOnSave).toHaveBeenCalledWith(mockFormValues);
    });
  });

  describe('Edge Cases', () => {
    it('Given the form is not open, when handleFormSubmit is called, then it should still call onSave but modal remains closed', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      expect(result.current.isModalVisible).toBe(false);

      // Act
      act(() => {
        result.current.handleFormSubmit(mockFormValues);
      });

      // Assert
      expect(mockOnSave).toHaveBeenCalledWith(mockFormValues);
      expect(result.current.isModalVisible).toBe(false);
    });

    it('Given openForm is called with undefined explicitly, when the modal opens, then prefilled data should be undefined', () => {
      // Arrange
      const {result} = renderUseRecordForm();

      // First set some prefilled data
      act(() => {
        result.current.openForm(mockPrefilledData);
      });

      expect(result.current.prefilledData).toEqual(mockPrefilledData);

      // Act - Open with explicit undefined
      act(() => {
        result.current.openForm(undefined);
      });

      // Assert
      expect(result.current.isModalVisible).toBe(true);
      expect(result.current.prefilledData).toBeUndefined();
    });
  });
});
