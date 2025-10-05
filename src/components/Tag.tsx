import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
    label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
    return (
        <View style={styles.tag}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
});

export default Tag;
