// src/components/LoadingModal/index.tsx
import React from 'react';
import {View, ActivityIndicator, Text, Modal} from 'react-native';

import {styles} from './styles';

type LoadingModalProps = {
  visible: boolean;
};

const LoadingModal = ({visible}: LoadingModalProps) => {
  return (
    <Modal transparent={true} animationType='fade' visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#FFFFFF' />
          <Text style={styles.text}>Analyzing...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
