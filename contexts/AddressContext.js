import React, { createContext, useState, useContext } from 'react';

// Tạo AddressContext để quản lý danh sách địa chỉ
const AddressContext = createContext();

// Provider để cung cấp dữ liệu địa chỉ cho các component con
export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]); // Lưu trữ địa chỉ

    // Thêm địa chỉ mới vào danh sách địa chỉ
    const addAddress = (newAddress) => {
        setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    };

    return (
        <AddressContext.Provider value={{ addresses, addAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

// Hook để sử dụng context
export const useAddress = () => useContext(AddressContext);
