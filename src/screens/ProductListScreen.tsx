
import React from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar } from "../components/SearchBar";
import ProductListComponent from "../components/ProductListComponent";
import { ProductProvider } from "../context/ProductContext";



const ProductListScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <ProductProvider>
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <SearchBar />
                <ProductListComponent />
            </View>
        </ProductProvider>
    )

}

export default ProductListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        paddingHorizontal: 8, paddingTop: 8
    }
})