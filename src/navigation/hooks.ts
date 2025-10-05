import { useNavigation, useRoute } from '@react-navigation/native';
import type { AppNavigation, AppRoute, RootStackParamList } from '../navigation/types';

// ✅ Typed navigation hook
export const useAppNavigation = () => useNavigation<AppNavigation>();
// ✅ Typed route hook
export const useAppRoute = <T extends keyof RootStackParamList>() => useRoute<AppRoute<T>>();