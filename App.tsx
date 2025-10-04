import { Button, NativeModules, StatusBar, StyleSheet, Text, TurboModuleRegistry, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import VoiceSearchScreen from './src/screens/VoiceSearchScreen';
import ProductListScreen from './src/screens/ProductListScreen';
function App() {
  
  return (
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {/* <VoiceSearchScreen /> */}
      <ProductListScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
