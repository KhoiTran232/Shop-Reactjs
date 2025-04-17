import React, { useState } from 'react';
import api from '../utils/api';

function AddressForm({ onSuccess, initialData = null }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        address: initialData?.address || '',
        city: initialData?.city || '',
        postalCode: initialData?.postalCode || '',
        country: initialData?.country || '',
        isDefault: initialData?.isDefault || false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialData) {
                await api.put(`/addresses/${initialData._id}`, formData);
            } else {
                await api.post('/addresses', formData);
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Address
                </label>
                <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Country
                </label>
                <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                    Set as default address
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                {initialData ? 'Update Address' : 'Add Address'}
            </button>
        </form>
    );
}

export default AddressForm;
