// screens/ProductScreen.js
import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { CartContext } from "../context/CartContext";

const ProductScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);

    const [selectedOption, setSelectedOption] = useState(product.options[0]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const toggleAddon = (addon) => {
        setSelectedAddons((prev) =>
            prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
        );
    };

    const calculatePrice = () => {
        let total = selectedOption.price;
        selectedAddons.forEach((a) => {
            total += a.price;
        });
        return (total * quantity).toFixed(2);
    };

    const handleAddToCart = () => {
        const item = {
            ...product,
            selectedOption,
            selectedAddons,
            quantity,
            totalPrice: calculatePrice(),
        };
        addToCart(item);
        navigation.navigate("Cart");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>{product.description}</Text>

            <Text style={styles.section}>Chọn size:</Text>
            {product.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedOption.size === option.size && styles.activeOption,
                    ]}
                    onPress={() => setSelectedOption(option)}
                >
                    <Text>
                        {option.size} - ${option.price}
                    </Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.section}>Chọn thêm:</Text>
            {product.addons.map((addon, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selectedAddons.includes(addon) && styles.activeOption,
                    ]}
                    onPress={() => toggleAddon(addon)}
                >
                    <Text>
                        {addon.name} +${addon.price}
                    </Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.section}>Số lượng:</Text>
            <View style={styles.quantity}>
                <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                    <Text style={styles.qBtn}>➖</Text>
                </TouchableOpacity>
                <Text style={styles.qText}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.qBtn}>➕</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                <Text style={styles.addText}>Add to Cart - ${calculatePrice()}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    section: { fontWeight: "bold", marginTop: 16 },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginVertical: 5,
    },
    activeOption: {
        backgroundColor: "#32CD32",
        borderColor: "green",
    },
    quantity: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    qBtn: { fontSize: 24, paddingHorizontal: 10 },
    qText: { fontSize: 18, marginHorizontal: 10 },
    addBtn: {
        marginTop: 20,
        backgroundColor: "#32CD32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    addText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default ProductScreen;