import { FlashList } from "@shopify/flash-list";
import { Product } from "../api/types";
import { ProductItem } from "./ProductItem";
import { StyleSheet, Text, View } from "react-native";
import { useCallback, useImperativeHandle } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductContext } from "../context/ProductContext";
import { parseVoiceQuery } from "../utils/ParseVoiceQuery";


const keyExtractor = (item: Product) => item.id.toString();
const renderItem = ({ item }: { item: Product }) => <ProductItem product={item} />;
const itemSeparator = () => <View style={{ height: 16 }} />

const ProductListComponent = () => {
    const { products, loadMore, allLoaded, search } = useProducts();
    const productContext = useProductContext();

    const listFooterComponent = useCallback(() => (
        allLoaded ? <Text style={{ textAlign: 'center', padding: 10 }}>No more products</Text> : <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>
    ), [allLoaded])

    useImperativeHandle(productContext.searchRef, () => ({
        search: (query: string) => {
            const q = parseVoiceQuery(query)
            console.log("Searching for:", q);
            search(query);
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