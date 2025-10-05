import { FlashList } from "@shopify/flash-list";
import { Product } from "../api/types";
import { ProductItem } from "./ProductItem";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useImperativeHandle, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductContext } from "../context/ProductContext";
import { parseVoiceQuery } from "../utils/ParseVoiceQuery";
import { useAppNavigation } from "../navigation/hooks";
import { logProductClicked } from "../utils/analytics/FirebaseAnalytics";
import NoInternetBanner from "./NoInternetBanner";
import { Strings } from "../utils/Strings";
import QueryTags from "./QueryTags";

const width = (Dimensions.get("window").width - 16) / 3;

const keyExtractor = (item: Product) => item.id.toString();

const itemSeparator = () => <View style={{ height: 16 }} />

const ProductListComponent = () => {
    const { products, loadMore, allLoaded, search, suggestions, reset: voiceReset, query } = useProducts();
    const productContext = useProductContext();
    const navigation = useAppNavigation();

    const productDetailsNavigate = useCallback((product: Product) => {
        // 📊 Analytics logging
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



    const finalProducts = useMemo(() => {
        const mainProduct: Product[] = [];
        const otherProduct: Product[] = [];

        products.forEach(product => {
            let isMatch = true;

            // Price filter
            if (query && query.price) {
                const { operator, value } = query.price;
                switch (operator) {
                    case '<':
                        if (!(product.price < value)) isMatch = false;
                        break;
                    case '>':
                        if (!(product.price > value)) isMatch = false;
                        break;
                    case '=':
                        if (!(product.price === value)) isMatch = false;
                        break;
                }
            }

            // Push to the correct array
            if (isMatch) mainProduct.push(product);
            else otherProduct.push(product);
        });

        return { mainProduct, otherProduct };
    }, [products, query]);

    const listFooterComponent = useCallback(() => (
        (suggestions.length > 0 || finalProducts.otherProduct.length > 0) ?
            <View style={{ paddingVertical: 16, }}>
                <Text style={{ marginBottom: 8 }}>
                    {
                        Strings.RELATED_SUGGESTIONS
                    }
                </Text>
                <FlashList
                    horizontal

                    contentContainerStyle={{ paddingVertical: 8, }}
                    data={[...finalProducts.otherProduct, ...suggestions]}
                    keyExtractor={keyExtractor}
                    renderItem={renderItemHorizontal}
                />
            </View>
            : allLoaded ? null : <Text style={{ textAlign: 'center', padding: 10 }}>
                {Strings.LOADING}
            </Text>
    ), [allLoaded, suggestions, finalProducts.otherProduct])

    const ListHeaderComponent = useCallback(() => (query ?
        (<QueryTags query={query} />) : null), [query]);

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
            <NoInternetBanner />
            <FlashList
                ListHeaderComponent={ListHeaderComponent}
                ItemSeparatorComponent={itemSeparator}
                contentContainerStyle={styles.listContainer}
                data={finalProducts.mainProduct}
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