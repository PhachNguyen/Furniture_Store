import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Đọc dữ liệu từ file JSON
const productData = require('../data/dataProduct.json');  // Đọc dữ liệu từ JSON

// Đối tượng ánh xạ các hình ảnh tĩnh
const imageMap = {
    "Anh_den_hoc.jpg": require("../assets/image/Product/Anh_den_hoc.jpg"),
    // Thêm các hình ảnh khác nếu cần
};

const HomeScreen = () => {
    const renderItem = ({ item }) => {
        // Lấy hình ảnh từ imageMap
        const imageSource = imageMap[item.image];

        return (
            <View style={styles.productContainer}>
                <Image source={imageSource} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Make home BEAUTIFUL</Text>

            <FlatList
                data={productData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    productList: {
        flex: 1,
    },
    productContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    addToCartButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default HomeScreen;
