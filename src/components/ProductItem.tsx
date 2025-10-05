import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Product } from "../api/types";

interface ProductItemProps {
  product: Product;
  size?: {
    width: number;
    height: number;
  };
}

const { width } = Dimensions.get("window");

export const ProductItem: React.FC<ProductItemProps> = ({ product, size }) => {
  return (
    <View style={[styles.container, size ? { width: size.width, } : {}]}>

      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />

      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>${product.price}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#555",
  },
});
