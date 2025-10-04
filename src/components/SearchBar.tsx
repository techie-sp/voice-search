import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import MicButton from "./MicButton";
type SearchBarProps = {
    value?: string;
    placeholder?: string;
    onChange?: (text: string) => void;
    debounceTime?: number;
};

export const SearchBar: React.FC<SearchBarProps> = ({
    value = "",
    placeholder = "Search products...",
    onChange,
    debounceTime = 400,
}) => {
    const insets = useSafeAreaInsets()
    const [text, setText] = useState(value);
    const [focused, setFocused] = useState(false);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Debounce user input
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange?.(text);
        }, debounceTime);
        return () => clearTimeout(timeout);
    }, [text]);

    // Small focus animation
    const animateFocus = (toValue: number) => {
        Animated.timing(scaleAnim, {
            toValue,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={{ paddingHorizontal: 16, columnGap: 12, backgroundColor: 'green', paddingTop: insets.top, flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ scale: scaleAnim }],
                        shadowOpacity: focused ? 0.3 : 0.1,
                    },
                ]}
            >
                <Ionicons name="search" size={20} color="#999" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    value={text}
                    onFocus={() => {
                        setFocused(true);
                        animateFocus(1.03);
                    }}
                    onBlur={() => {
                        setFocused(false);
                        animateFocus(1);
                    }}
                    onChangeText={setText}
                    returnKeyType="search"
                />
                {text.length > 0 && (
                    <TouchableOpacity onPress={() => setText("")}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </Animated.View>
            <MicButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#222",
        paddingVertical: 6,
    },
});
