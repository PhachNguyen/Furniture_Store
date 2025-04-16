// components/ProductCard.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ProductCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                //     source={require("../assets/images/kimchi-bbq.png")} // bạn thay đường dẫn phù hợp
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text>{product.description}</Text>
                <Text style={styles.price}>From ${product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginVertical: 8,
        padding: 10,
        borderRadius: 8,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    price: {
        marginTop: 4,
        fontWeight: "600",
    },
});

export default ProductCard;