import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function ShippingCalculator({ address, weight, totalAmount, onShippingCostChange }) {
    const [shippingCost, setShippingCost] = useState(0);
    const [estimatedDays, setEstimatedDays] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (address && weight) {
            calculateShipping();
        }
    }, [address, weight, totalAmount]); // eslint-disable-line react-hooks/exhaustive-deps

    const calculateShipping = async () => {
        try {
            setLoading(true);
            const { data } = await api.post('/shipping/calculate', {
                region: address.city,
                weight,
                totalAmount
            });
            setShippingCost(data.cost);
            setEstimatedDays(data.estimatedDays);
            onShippingCostChange(data.cost);
        } catch (err) {
            setError(err.response?.data?.message || 'Error calculating shipping');
        } finally {
            setLoading(false);
        }
    };

    if (!address) return null;
    if (loading) return <div>Calculating shipping cost...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Shipping Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
                <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
                <p>Estimated Delivery: {estimatedDays}</p>
                {totalAmount >= 1000 && (
                    <p className="text-green-600">
                        Free shipping for orders over $1,000!
                    </p>
                )}
            </div>
        </div>
    );
}

export default ShippingCalculator;
