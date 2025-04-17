import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen'; // ✅ Thêm dòng này
import CheckoutScreen from '../screens/CheckoutScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';


const Stack = createStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ headerShown: false }} // ✅ Ẩn header trang giỏ
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    headerShown: false, // Hiển thị header cho màn hình Checkout
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => navigation.goBack()}>
                    //         <Ionicons name="arrow-back" size={24} color="#000" />
                    //     </TouchableOpacity>
                    // ),
                }}

            />
            <Stack.Screen
                name="Address"
                component={ShippingAddressScreen}
                options={{
                    headerShown: true, // Hiển thị header cho màn hình Checkout
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => navigation.goBack()}>
                    //         <Ionicons name="arrow-back" size={24} color="#000" />
                    //     </TouchableOpacity>
                    // ),
                }}
            />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        </Stack.Navigator>
    );
}
