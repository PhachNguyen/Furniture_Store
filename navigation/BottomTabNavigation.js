import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const [orderSuccess, setOrderSuccess] = useState(false); // Quản lý trạng thái đặt hàng thành công

    const handleOrderSuccess = () => {
        setOrderSuccess(false); // Đặt hàng thành công, hiển thị dấu chấm đỏ
    };

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
                listeners={{
                    tabPress: () => {
                        handleOrderSuccess(); // Gọi khi đặt hàng thành công
                    }
                }}
            />
            <Tab.Screen
                name="Bookmark"
                component={BookmarkScreen}
                options={{
                    tabBarLabel: 'Bookmark',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Notifications', // Nhãn văn bản 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                    tabBarBadge: orderSuccess ? '•' : null, // Dấu chấm đỏ khi đơn hàng thành công
                }}
            />
            <Tab.Screen
                name="Profile"
                component={StackNavigator}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
