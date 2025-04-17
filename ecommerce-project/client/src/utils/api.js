import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request config:', {
            url: config.url,
            headers: config.headers,
            method: config.method
        });
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            message: error.response?.data?.message,
            config: error.config
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            
            const currentPath = window.location.pathname;
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
        return Promise.reject(error);
    }
);

export const userApi = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users/register', userData),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData)
};

export const orderApi = {
    createOrder: async (orderData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Vui lòng đăng nhập để tiếp tục');
            }

            console.log('Creating order with token:', token);
            console.log('Order data:', orderData);

            const response = await api.post('/orders', orderData);
            return response;
        } catch (error) {
            console.error('Order creation error:', error);
            throw error;
        }
    },
    getOrder: async (orderId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Vui lòng đăng nhập để xem đơn hàng');
        }
        return api.get(`/orders/${orderId}`);
    },
    getMyOrders: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Vui lòng đăng nhập để xem đơn hàng');
        }
        return api.get('/orders/myorders');
    },
    updateOrderStatus: async (orderId, status) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Vui lòng đăng nhập để cập nhật đơn hàng');
        }
        return api.put(`/orders/${orderId}/status`, { status });
    },
    subscribeToOrderUpdates: (orderId, callback) => {
        const socket = new WebSocket(`${api.defaults.baseURL}/orders/${orderId}`);
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            callback(data);
        };
        return () => socket.close();
    }
};

export const uploadApi = {
    uploadImage: (formData) => api.post('/upload', formData)
};

export const productApi = {
    getAdminProducts: () => api.get('/products/admin'),
    
    getProducts: (filters = {}) => {
        const params = new URLSearchParams();
        
        if (filters.category && filters.category !== 'All Categories') {
            params.append('category', filters.category);
        }
        
        if (filters.priceRange && filters.priceRange !== 'All Prices') {
            params.append('priceRange', filters.priceRange);
        }
        
        if (filters.sortBy && filters.sortBy !== 'Newest') {
            params.append('sortBy', filters.sortBy);
        }

        return api.get('/products', { params });
    },
    
    createProduct: (formData) => {
        return api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    
    updateProduct: (id, formData) => {
        console.log('Updating product:', id, formData);
        return api.put(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    
    deleteProduct: (id) => api.delete(`/products/${id}`),
    getProductById: (id) => {
        console.log('Calling getProductById with ID:', id);
        return api.get(`/products/${id}`);
    }
};

export default api;
