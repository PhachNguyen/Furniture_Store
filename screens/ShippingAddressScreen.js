import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useAddress } from '../contexts/AddressContext';  // Sử dụng AddressContext
import { EvilIcons } from '@expo/vector-icons';

export default function ShippingAddressScreen({ navigation }) {
    const { addresses } = useAddress();  // Lấy danh sách địa chỉ từ AddressContext

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Địa chỉ đặt hàng</Text>
            <ScrollView>
                {/* Hiển thị danh sách các địa chỉ */}
                {addresses.map((address) => (
                    <View key={address.id} style={styles.addressCard}>
                        <Text style={styles.addressName}>{address.name}</Text>
                        <Text style={styles.addressText}>{address.address}</Text>
                        {/* Thêm icon bút chì để chỉnh sửa */}
                        <TouchableOpacity onPress={() => handleEditAddress(address)} style={styles.editIcon}>
                            <EvilIcons name="pencil" size={30} color="#888" />  {/* Icon bút chì */}
                        </TouchableOpacity>
                        {address.isDefault && <Text style={styles.defaultText}>Default Address</Text>}
                    </View>
                ))}
            </ScrollView>

            {/* Nút điều hướng tới màn hình thêm địa chỉ */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddAddress')} // Điều hướng đến AddAddressScreen
            >
                <Text style={styles.addText}>+ Thêm địa chỉ mới</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addressCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2, // Android shadow effect
    },
    addressName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 14,
        color: '#888',
    },
    defaultText: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editIcon: {
        position: 'absolute',  // Đặt icon vào vị trí cố định trong card
        right: 15,  // Căn phải
        top: '50%',  // Căn trên
        color: '#888'
    },
});
