import React, { useEffect } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { useNetworkContext } from '../context/NetworkContext';

const NoInternetBanner = () => {

    const { isConnected } = useNetworkContext()
    const heightAnim = React.useRef(new Animated.Value(isConnected ? 0 : 20)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: isConnected ? 0 : 20,
            duration: 300,
            useNativeDriver: false,
        }).start();

    }, [isConnected])

    return (
        <Animated.View
            style={[
                styles.container,
                { height: heightAnim }
            ]}>
            <Text style={styles.text}>⚠️ No Internet Connection</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 20,
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f83232ff',
        alignItems: 'center',
        zIndex: 999,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default NoInternetBanner;
