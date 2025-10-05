import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled ? styles.disabled : styles.enabled,
        style,
      ]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enabled: {
    backgroundColor: '#2e7d32',
  },
  disabled: {
    backgroundColor: '#a5d6a7',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
