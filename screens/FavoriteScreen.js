import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';



export default function FavoriteScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) loadFavorites();
    }, [isFocused]);

    const loadFavorites = async () => {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) setFavorites(JSON.parse(stored));
    };

    const removeFavorite = async (id) => {
        const updated = favorites.filter((item) => item.id !== id);
        setFavorites(updated);
        await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    };

    const addToCart = async (item) => {
        const stored = await AsyncStorage.getItem('cart');
        let cart = stored ? JSON.parse(stored) : [];

        const existing = cart.find((p) => p.id === item.id);
        if (existing) {
            cart = cart.map((p) =>
                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleAddAllToCart = async () => {
        if (favorites.length === 0) return;
        const stored = await AsyncStorage.getItem('cart');
        let cart = stored ? JSON.parse(stored) : [];

        favorites.forEach((fav) => {
            const exists = cart.find((c) => c.id === fav.id);
            if (exists) {
                cart = cart.map((c) =>
                    c.id === fav.id ? { ...c, quantity: c.quantity + 1 } : c
                );
            } else {
                cart.push({ ...fav, quantity: 1 });
            }
        });

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        alert(`Đã thêm tất cả ${favorites.length} sản phẩm vào giỏ hàng!`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="close" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addToCart(item)} style={{ marginLeft: 12 }}>
                <Ionicons name="bag-outline" size={22} color="#333" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar barStyle="dark-content" /> */}

            {/* Header */}
            <View View style={styles.header} >
                <Ionicons name="search-outline" size={24} color="#000" />
                <Text style={styles.headerTitle}>Favorites</Text>
                <Ionicons name="cart-outline" size={24} color="#000" />
            </View >

            {/* Content List */}
            < FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()
                }
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* Fixed Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToCart}>
                    <Text style={styles.addAllText}>Add all to my cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 40
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        paddingBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
    },
    price: {
        color: '#888',
        marginTop: 4,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 12,
        backgroundColor: '#000',
        overflow: 'hidden',           // 👈 chống viền đen không mong muốn
        elevation: 6,                 // 👈 thêm shadow nhẹ cho Android
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },

    addAllButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },

    addAllText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
