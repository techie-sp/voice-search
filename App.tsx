import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ToastMessage from './src/components/ToastMessage';
import AppNavigationContainer from './src/navigation';


function App() {

  return (
    <SafeAreaProvider>
      <AppNavigationContainer />
      <ToastMessage />
    </SafeAreaProvider>
  );
}

export default App;
