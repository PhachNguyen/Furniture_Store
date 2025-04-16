import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Giả sử dữ liệu thông báo được lấy từ JSON
const notifications = [
    {
        id: "1",
        message: "Your order #123456789 has been confirmed",
        status: "New",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isHot: false
    },
    {
        id: "2",
        message: "Your order #123456789 has been canceled",
        status: "Canceled",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isHot: false
    },
    {
        id: "3",
        message: "Your order #123456789 has been shipped successfully",
        status: "Shipped",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isHot: true
    }
];

const NotificationScreen = () => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.notificationContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.notificationMessage}>{item.message}</Text>
                    {item.status === 'New' && <Text style={styles.newBadge}>New</Text>}
                    {item.isHot && <Text style={styles.hotBadge}>HOT</Text>}
                </View>
                <Text style={styles.notificationDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notification</Text>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
    notificationContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    newBadge: {
        backgroundColor: 'green',
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    hotBadge: {
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#888',
        marginVertical: 10,
    },
    viewDetailsButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default NotificationScreen;
