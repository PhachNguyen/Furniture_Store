import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';  // Import axios để gọi API

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    // Fetch data from the API (Backend)
    useEffect(() => {
        // Gọi API để lấy sản phẩm
        axios.get('http://localhost:8080/api/v1/products')
            .then((response) => {
                setProducts(response.data);  // Cập nhật danh sách sản phẩm
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Product List</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            {/* <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddProduct')}>
                <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProductListScreen;
