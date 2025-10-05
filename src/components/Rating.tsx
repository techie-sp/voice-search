import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RatingProps {
  rating: number; // current value (0–5)
  max?: number;   // total stars
  size?: number;  // star font size
  editable?: boolean;
  onChange?: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  max = 5,
  size = 20,
  editable = false,
  onChange,
}) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    const filled = i <= rating;
    stars.push(
      <TouchableOpacity
        key={i}
        activeOpacity={editable ? 0.7 : 1}
        onPress={() => editable && onChange?.(i)}
        style={{ marginHorizontal: 2 }}>
        <Text
          style={[
            styles.star,
            { fontSize: size, color: filled ? '#FFD700' : '#ccc' },
          ]}>
          ★
        </Text>
      </TouchableOpacity>,
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  star: { fontWeight: 'bold' },
});
