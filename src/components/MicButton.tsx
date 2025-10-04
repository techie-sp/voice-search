import { Ionicons } from "@react-native-vector-icons/ionicons";
import React, { useState, useEffect, useRef } from "react";
import { Pressable, Animated, StyleSheet, View } from "react-native";


const MicButton = ({ onPress }: { onPress?: () => void }) => {
    const [isRecording, setIsRecording] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isRecording) {
            // Start pulsing background
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.stopAnimation();
            pulseAnim.setValue(0);
        }
    }, [isRecording]);

    const handlePress = () => {
        setIsRecording(!isRecording);
        onPress?.();
    };

    const pulseScale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.6],
    });

    const pulseOpacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0],
    });

    return (
        <Pressable onPress={handlePress} style={styles.wrapper}>
            <View style={styles.center}>
                {isRecording && (
                    <Animated.View
                        style={[
                            styles.pulse,
                            {
                                transform: [{ scale: pulseScale }],
                                opacity: pulseOpacity,
                            },
                        ]}
                    />
                )}
                <Animated.View
                    style={[
                        styles.iconContainer,
                        isRecording ? styles.recording : styles.idle,
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <Ionicons
                        name={isRecording ? "stop-circle" : "mic-outline"}
                        size={26}
                        color={isRecording ? "#fff" : "#555"}
                    />
                </Animated.View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapper: {
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    pulse: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(255,0,0,0.4)",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    idle: {
        backgroundColor: "#E0E0E0",
    },
    recording: {
        backgroundColor: "#E53935",
    },
});

export default MicButton;
