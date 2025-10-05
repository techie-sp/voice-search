import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { NetworkProvider } from '../context/NetworkContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigationContainer = () => {


    return (
        <NetworkProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ProdectListScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="ProdectListScreen" component={ProductListScreen} />
                    <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </NetworkProvider>
    )
};

export default AppNavigationContainer;