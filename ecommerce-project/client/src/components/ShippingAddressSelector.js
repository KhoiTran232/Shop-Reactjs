import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../utils/api';
import AddressForm from './AddressForm';

function ShippingAddressSelector({ onSelect, selectedAddress }) {
    const [addresses, setAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAddresses();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchAddresses = async () => {
        try {
            const { data } = await api.get('/addresses');
            setAddresses(data);
            // Tự động chọn địa chỉ mặc định
            const defaultAddress = data.find(addr => addr.isDefault);
            if (defaultAddress && !selectedAddress) {
                onSelect(defaultAddress);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching addresses');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await api.delete(`/addresses/${addressId}`);
                setAddresses(addresses.filter(addr => addr._id !== addressId));
                if (selectedAddress?._id === addressId) {
                    onSelect(null);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting address');
            }
        }
    };

    const handleAddressSubmit = () => {
        setShowAddForm(false);
        setEditingAddress(null);
        fetchAddresses();
    };

    if (loading) return <div>Loading addresses...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Shipping Address</h3>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center text-indigo-600 hover:text-indigo-700"
                >
                    <FaPlus className="mr-1" />
                    Add New Address
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                    <div
                        key={address._id}
                        className={`p-4 border rounded-lg cursor-pointer ${
                            selectedAddress?._id === address._id
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => onSelect(address)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{address.name}</p>
                                <p className="text-sm text-gray-600">{address.phone}</p>
                                <p className="text-sm text-gray-600">
                                    {address.address}, {address.city}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {address.postalCode}, {address.country}
                                </p>
                                {address.isDefault && (
                                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                        Default
                                    </span>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingAddress(address);
                                    }}
                                    className="text-gray-600 hover:text-indigo-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(address._id);
                                    }}
                                    className="text-gray-600 hover:text-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit Address */}
            {(showAddForm || editingAddress) && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">
                            {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        <AddressForm
                            initialData={editingAddress}
                            onSuccess={() => {
                                handleAddressSubmit();
                            }}
                        />
                        <button
                            onClick={() => {
                                setShowAddForm(false);
                                setEditingAddress(null);
                            }}
                            className="mt-4 w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShippingAddressSelector;
