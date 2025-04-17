import React, { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

const initialState = {
    compareList: [],
    wishlist: [],
    loading: false,
    error: null
};

function productReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_COMPARE':
            return {
                ...state,
                compareList: [...state.compareList, action.payload]
            };
        case 'REMOVE_FROM_COMPARE':
            return {
                ...state,
                compareList: state.compareList.filter(id => id !== action.payload)
            };
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload]
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(id => id !== action.payload)
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export function ProductProvider({ children }) {
    const [state, dispatch] = useReducer(productReducer, initialState);

    const value = {
        state,
        dispatch,
        addToCompare: (productId) => {
            dispatch({ type: 'ADD_TO_COMPARE', payload: productId });
        },
        removeFromCompare: (productId) => {
            dispatch({ type: 'REMOVE_FROM_COMPARE', payload: productId });
        },
        addToWishlist: (productId) => {
            dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
        },
        removeFromWishlist: (productId) => {
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
        }
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
}
