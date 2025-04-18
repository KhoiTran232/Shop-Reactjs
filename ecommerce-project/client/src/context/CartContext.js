import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : null
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item._id === existItem._id ? action.payload : item
                    )
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload)
            };

        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: []
            };

        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.payload
            };

        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    useEffect(() => {
        if (state.shippingAddress) {
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
        }
    }, [state.shippingAddress]);

    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                ...product,
                quantity
            }
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: productId
        });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
    };

    const saveShippingAddress = (address) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: address
        });
    };

    return (
        <CartContext.Provider value={{
            cartItems: state.cartItems,
            shippingAddress: state.shippingAddress,
            addToCart,
            removeFromCart,
            clearCart,
            saveShippingAddress
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
