import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../api/types";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    ProdectListScreen: undefined; // no params
    ProductDetailsScreen: { product: Product }; // example params
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;
export type AppRoute<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;