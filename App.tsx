import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ProductListScreen from './src/screens/ProductListScreen';
import ToastMessage from './src/components/ToastMessage';
import AppNavigationContainer from './src/navigation';


function App() {

  return (
    <SafeAreaProvider>
      <AppNavigationContainer />
    </SafeAreaProvider>
  );
}

export default App;
