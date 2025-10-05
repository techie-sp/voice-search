import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useAppNavigation, useAppRoute } from '../navigation/hooks';
import { Rating } from '../components/Rating';
import { AppButton } from '../components/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Strings } from '../utils/Strings';


export default function ProductDetailsScreen() {
    const navigation = useAppNavigation()
    const insets = useSafeAreaInsets();
    const route = useAppRoute<'ProductDetailsScreen'>();
    const { product } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: product.title, headerShown: true })
    }, [])

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20, paddingTop: insets.top }}
            showsVerticalScrollIndicator={false}>

            {/* Product Image */}
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.thumbnail}
                resizeMode="contain"
            />

            {/* Title & Price */}
            <View style={styles.header}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.category}>{product.category}</Text>
            </View>

            {/* Rating */}
            <View style={styles.ratingRow}>
                <Rating
                    rating={product.rating}
                />
                <Text style={styles.ratingText}>{product.rating.toFixed(1)} / 5</Text>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>
                {
                    Strings.DESCRIPTION
                }
            </Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* Dimensions */}
            <Text style={styles.sectionTitle}>{
                Strings.DIMENSIONS}</Text>
            <Text style={styles.subText}>
                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
            </Text>

            {/* Shipping & Warranty */}
            <Text style={styles.sectionTitle}>
                {Strings.SHIPPING_WARRANTY}
            </Text>
            <Text style={styles.subText}>{product.shippingInformation}</Text>
            <Text style={styles.subText}>{product.warrantyInformation}</Text>

            {/* Return Policy */}
            <Text style={styles.sectionTitle}>
                {Strings.RETURN_POLICY}
            </Text>
            <Text style={styles.subText}>{product.returnPolicy}</Text>

            {/* Tags */}
            <Text style={styles.sectionTitle}>
                {Strings.TAGS}
            </Text>
            <View style={styles.tagContainer}>
                {product.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            {/* Reviews */}
            <Text style={styles.sectionTitle}>
                {Strings.CUSTOMER_REVIEWS}
            </Text>
            {product.reviews.length > 0 ? (
                <FlatList
                    data={product.reviews}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.reviewCard}>
                            <Text style={styles.reviewerName}>{item.reviewerName}</Text>
                            <Rating
                                rating={product.rating}
                            />
                            <Text style={styles.reviewComment}>{item.comment}</Text>
                            <Text style={styles.reviewDate}>{item.date}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.subText}>{
                    Strings.NO_REVIEWS
                }</Text>
            )}

            {/* Add to Cart */}
            <View style={styles.footer}>
                <AppButton title={'Add to Cart'} onPress={function (): void {
                    console.log('Add to cart')
                }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    thumbnail: { width: '100%', height: 250 },
    header: { padding: 16 },
    title: { fontSize: 24, fontWeight: '700', color: '#222' },
    price: { fontSize: 20, fontWeight: '600', color: '#2e7d32', marginTop: 4 },
    brand: { fontSize: 14, color: '#555' },
    category: { fontSize: 13, color: '#888' },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 8,
        gap: 8,
    },
    ratingText: { fontSize: 14, color: '#555' },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    description: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        paddingHorizontal: 16,
        marginTop: 4,
    },
    subText: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 16,
        marginTop: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        marginTop: 8,
    },
    tag: {
        backgroundColor: '#e0f2f1',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: { fontSize: 13, color: '#00796b' },
    reviewCard: {
        backgroundColor: '#fafafa',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 12,
        borderRadius: 8,
    },
    reviewerName: { fontWeight: '600', marginBottom: 4, color: '#333' },
    reviewComment: { color: '#555', marginVertical: 4 },
    reviewDate: { fontSize: 12, color: '#888' },
    footer: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    cartButton: {
        borderRadius: 8,
        backgroundColor: '#2e7d32',
        paddingVertical: 8,
    },
});
