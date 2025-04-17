import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { EvilIcons } from '@expo/vector-icons';
import { useAddress } from '../contexts/AddressContext';
import CheckBox from '../components/input/Checkbox';
import shippingOptions from '../data/shippingOptions.json'; // JSON file đã tách

export default function CheckoutScreen() {
    const { addresses } = useAddress();
    const [cart, setCart] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [isPaymentOnDelivery, setIsPaymentOnDelivery] = useState(false);
    const [isPaymentByCard, setIsPaymentByCard] = useState(false);
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart');
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    setCart(parsedCart);
                    const total = parsedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    setTotalPrice(total);
                }
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        loadCart();
    }, []);

    useEffect(() => {
        const defaultAddress = addresses.find((address) => address.isDefault === true);
        setCurrentAddress(defaultAddress);
    }, [addresses]);

    const handlePaymentMethodChange = (paymentType) => {
        if (paymentType === 'card') {
            setIsPaymentByCard(!isPaymentByCard);
            if (!isPaymentByCard) setIsPaymentOnDelivery(false);
        } else {
            setIsPaymentOnDelivery(!isPaymentOnDelivery);
            if (!isPaymentOnDelivery) setIsPaymentByCard(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Thanh toán</Text>

                {/* Địa chỉ giao hàng */}
                <View style={styles.section}>
                    <View style={styles.touchable}>
                        <Text style={styles.sectionHeader}>Địa chỉ giao hàng</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Address')} style={styles.editIcon}>
                            <EvilIcons name="pencil" size={30} color="#888" />
                        </TouchableOpacity>
                    </View>
                    {currentAddress ? (
                        <>
                            <Text style={styles.textAddressName}>{currentAddress.name}</Text>
                            <Text style={styles.textAddress}>{currentAddress.address}</Text>
                        </>
                    ) : (
                        <Text>Đang tải địa chỉ...</Text>
                    )}
                </View>

                {/* Giỏ hàng */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Giỏ hàng của bạn</Text>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <View style={styles.cartItem} key={item.id}>
                                <Image source={item.img} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                    <Text style={styles.itemQuantity}>Số lượng: 0{item.quantity}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>Giỏ hàng của bạn hiện tại đang trống.</Text>
                    )}
                </View>

                {/* Phương thức thanh toán */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Phương thức thanh toán</Text>
                    <View style={styles.paymentCard}>
                        <CheckBox
                            isChecked={isPaymentByCard}
                            onPress={() => handlePaymentMethodChange('card')}
                            label=""
                        />
                        <Image source={require('../assets/image/mastercard.jpg')} style={styles.Paymentimg} />
                        <Text style={styles.cardInfo}>**** **** **** 3947</Text>
                    </View>
                    <View style={styles.paymentCard}>
                        <CheckBox
                            isChecked={isPaymentOnDelivery}
                            onPress={() => handlePaymentMethodChange('delivery')}
                            label=""
                        />
                        <FontAwesome name="money" size={24} color="green" />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>
                            Thanh toán khi nhận hàng
                        </Text>
                    </View>
                </View>

                {/* Phương thức vận chuyển */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Phương thức vận chuyển</Text>
                    {shippingOptions.map((option) => (
                        <View
                            key={option.id}
                            style={[
                                styles.shippingOption,
                                selectedShipping?.id === option.id && styles.selectedShipping,
                            ]}
                        >
                            <CheckBox
                                isChecked={selectedShipping?.id === option.id}
                                onPress={() =>
                                    setSelectedShipping(
                                        selectedShipping?.id === option.id ? null : option
                                    )
                                }
                                label={`${option.label} (${option.fee === 0 ? 'Miễn phí' : `$${option.fee.toFixed(2)}`})`}
                            />
                        </View>
                    ))}
                </View>

                {/* Tổng kết giá */}
                <View style={styles.section}>
                    <Text style={styles.priceLabel}>Đơn hàng: ${totalPrice.toFixed(2)}</Text>
                    <Text style={styles.priceLabel}>
                        Phí vận chuyển: ${selectedShipping?.fee?.toFixed(2) || '0.00'}
                    </Text>
                    <Text style={styles.totalAmount}>
                        Tổng cộng: ${(totalPrice + (selectedShipping?.fee || 0)).toFixed(2)}
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>ĐẶT HÀNG</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff',
        padding: 20
    },
    backButton: {
        position: 'absolute', top: 40, left: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 6, elevation: 3,
        zIndex: 10,
    },
    scrollContainer: {
        marginTop: 25
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    touchable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        marginBottom: 20,
        borderWidth: 0.2,
        borderRadius: 20,
        padding: 10
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
        marginBottom: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555'
    },
    cartItem: {
        flexDirection: 'row'
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#909090',
    },
    paymentCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    Paymentimg: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    cardInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    textAddressName: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10
    },
    textAddress: {
        fontSize: 14,
        color: '#888'
    },
    shippingOption: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    },
    selectedShipping: {
        backgroundColor: '#e0f7ff',
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    priceLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    submitButton: {
        backgroundColor: '#242424',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    totalAmount: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 6,
    },

    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
