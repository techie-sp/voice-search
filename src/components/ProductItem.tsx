import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Product } from "../api/types";

interface ProductItemProps {
  product: Product;
}

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = (width - 32 - 16) / 2; 

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <View style={styles.container}>

      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
      
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>${product.price}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    width: "100%",
    height: IMAGE_HEIGHT, 
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
