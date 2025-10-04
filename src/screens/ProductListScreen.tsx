
import React, { useCallback, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useProducts } from "../hooks/useProducts"
import { FlashList } from "@shopify/flash-list";
import { Product } from "../api/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductItem } from "../components/ProductItem";
import { SearchBar } from "../components/SearchBar";


const keyExtractor = (item: Product) => item.id.toString();

const ProductListScreen = () => {
    const { products, loadMore, allLoaded } = useProducts();
    const insets = useSafeAreaInsets();

    const renderItem = useCallback(({ item }: { item: Product }) => <ProductItem product={item} />, [])


    useEffect(() => {
        loadMore();
    }, [])

    return (
        <View style={[styles.container, {  paddingBottom: insets.bottom }]}>
            <SearchBar />
            <FlashList
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 4 }}
                data={products}
                numColumns={2}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onEndReached={() => {
                    if (!allLoaded) {
                        loadMore();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => (
                    allLoaded ? <Text style={{ textAlign: 'center', padding: 10 }}>No more products</Text> : <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>
                )}
            />
        </View>
    )

}

export default ProductListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})