import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../utils/api';
import PropTypes from 'prop-types';

function PaymentForm({ amount, onSubmit, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    useEffect(() => {
        // Kiểm tra xem Stripe đã được khởi tạo chưa
        if (!stripe) {
            setError('Stripe has not been initialized. Please check your configuration.');
        }
    }, [stripe]);

    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            setError('Stripe has not been initialized');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            // Create order first
            const order = await onSubmit();
            
            // Create payment intent
            const { data: { clientSecret } } = await api.post(
                '/payments/stripe/create-payment-intent',
                { orderId: order._id }
            );

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVNPayPayment = async () => {
        try {
            setLoading(true);
            const order = await onSubmit();
            const { data: { paymentUrl } } = await api.post(
                '/payments/vnpay/create-payment-url',
                { orderId: order._id }
            );
            window.location.href = paymentUrl;
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed');
            setLoading(false);
        }
    };

    const handleMoMoPayment = async () => {
        try {
            setLoading(true);
            const order = await onSubmit();
            const { data: { paymentUrl } } = await api.post(
                '/payments/momo/create-payment-url',
                { orderId: order._id }
            );
            window.location.href = paymentUrl;
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed');
            setLoading(false);
        }
    };

    const handlePayment = () => {
        switch (paymentMethod) {
            case 'stripe':
                handleStripePayment();
                break;
            case 'vnpay':
                handleVNPayPayment();
                break;
            case 'momo':
                handleMoMoPayment();
                break;
            default:
                setError('Invalid payment method');
                break;
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Select Payment Method</h2>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="stripe"
                            checked={paymentMethod === 'stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        Credit Card (Stripe)
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="vnpay"
                            checked={paymentMethod === 'vnpay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        VNPay
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="momo"
                            checked={paymentMethod === 'momo'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                        />
                        MoMo
                    </label>
                </div>
            </div>

            {error && (
                <div className="mb-4 text-red-600">
                    {error}
                </div>
            )}

            {paymentMethod === 'stripe' && (
                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                },
                                invalid: {
                                    color: '#9e2146'
                                }
                            }
                        }}
                    />
                </div>
            )}

            <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md ${
                    loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white font-medium`}
            >
                {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </button>
        </div>
    );
}

PaymentForm.propTypes = {
    amount: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};

export default PaymentForm;
