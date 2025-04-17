import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CheckBox = ({ onPress, label, isChecked }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Text style={styles.checkMark}>✔</Text>}  {/* Hiển thị dấu tick khi checked */}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}  {/* Hiển thị label */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 30,
        borderWidth: 2,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'black', // Màu nền khi checked
        borderColor: 'black',

    },
    checkMark: {
        color: 'white',
        // fontSize: 22,  // Đặt kích thước dấu chấm lớn hơn
        textAlign: 'center'
        // marginTop: -3,  // Căn giữa dấu chấm với checkbox
    },
    label: {
        fontSize: 16,
    },
});

export default CheckBox;
