// ToastMessage.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, ViewStyle } from "react-native";
import { ToastService } from "../utils/ToastService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ToastMessage: React.FC = ({
}) => {
    const insets = useSafeAreaInsets();
    const [data, setData] = React.useState<{ message: string }>({
        message: '',
    });
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (data.message) {
            // Animate in
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            // Hide after duration
            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: 100,
                        duration: 250,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setData({ message: '' });
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [data.message]);

    useEffect(() => {
        const unsubscribe = ToastService.subscribe((msg) => {
            setData({
                message: msg,
            });
        });
        return unsubscribe;
    }, []);

    if (!data.message) return null;

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    transform: [{ translateY }],
                    opacity,
                },
                { bottom: 50 + insets.bottom } as ViewStyle
            ]}
        >
            <Text style={styles.toastText}>{data.message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: "absolute",
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: "#333",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    toastText: {
        color: "#fff",
        fontSize: 14,
    },
});

export default ToastMessage;
