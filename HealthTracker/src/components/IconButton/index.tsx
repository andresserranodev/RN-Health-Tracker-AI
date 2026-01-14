import React from 'react';
import {TouchableOpacity, Text, View, StyleProp, ViewStyle} from 'react-native';

import {styles} from './styles';

type IconButtonProps = {
  onPress: () => void;
  text: string;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const IconButton = ({onPress, text, icon, style}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>{icon}</View>

        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
