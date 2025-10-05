import { FlashList } from "@shopify/flash-list";
import { Product } from "../api/types";
import { ProductItem } from "./ProductItem";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useImperativeHandle } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductContext } from "../context/ProductContext";
import { parseVoiceQuery } from "../utils/ParseVoiceQuery";
import { useAppNavigation } from "../navigation/hooks";
import { logProductClicked } from "../utils/analytics/FirebaseAnalytics";

const width = (Dimensions.get("window").width - 16) / 3;

const keyExtractor = (item: Product) => item.id.toString();

const itemSeparator = () => <View style={{ height: 16 }} />

const ProductListComponent = () => {
    const { products, loadMore, allLoaded, search, suggestions, reset: voiceReset } = useProducts();
    const productContext = useProductContext();
    const navigation = useAppNavigation();

    const productDetailsNavigate = useCallback((product: Product) => {
        logProductClicked(product.id.toString(), product.title);
        navigation.navigate('ProductDetailsScreen', { product });
    }, []);

    const renderItemHorizontal = useCallback(({ item }: { item: Product }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => productDetailsNavigate(item)}>
            <ProductItem product={item} size={{
                width: width, height: width * 1.7
            }} />
        </TouchableOpacity>
    ), [productDetailsNavigate]);

    const renderItem = useCallback(({ item }: { item: Product }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => productDetailsNavigate(item)}>
            <ProductItem product={item} />
        </TouchableOpacity>
    ), [productDetailsNavigate]);

    const listFooterComponent = useCallback(() => (
        suggestions.length > 0 ?
            <View style={{ paddingVertical: 16, }}>
                <Text style={{ marginBottom: 8 }}>Related suggestions</Text>
                <FlashList
                    horizontal
                    contentContainerStyle={{ paddingVertical: 8, }}
                    data={suggestions}
                    keyExtractor={keyExtractor}
                    renderItem={renderItemHorizontal}
                />
            </View>
            : allLoaded ? <Text style={{ textAlign: 'center', padding: 10 }}>No more products</Text> : <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>
    ), [allLoaded, suggestions])

    useImperativeHandle(productContext.searchRef, () => ({
        reset: () => {
            voiceReset();
        },
        search: (query: string) => {
            const q = parseVoiceQuery(query)
            search(q, query);

        }
    }), [search]);

    return (
        <>
            <FlashList
                ItemSeparatorComponent={itemSeparator}
                contentContainerStyle={styles.listContainer}
                data={products}
                numColumns={2}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={listFooterComponent}
            />
        </>
    );
};

export default ProductListComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        paddingHorizontal: 8, paddingTop: 8
    }
})