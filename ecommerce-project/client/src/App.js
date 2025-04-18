import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import UserManagement from './pages/admin/UserManagement';
import AdminOrders from './pages/admin/AdminOrders';
import CouponManagement from './pages/admin/CouponManagement';
import AdminSettings from './pages/admin/AdminSettings';
import ProductList from './pages/ProductList';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import UserProfile from './pages/UserProfile';
import ProductEdit from './pages/admin/ProductEdit';
import ProtectedRoute from './components/ProtectedRoute';
import AddProduct from './pages/admin/AddProduct';
<<<<<<< HEAD
import Footer from './components/Footer';
=======
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
<<<<<<< HEAD
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/track/:id" element={<OrderTracking />} />
                  <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="coupons" element={<CouponManagement />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/product/:id/edit" 
                    element={
                      <ProtectedRoute isAdmin>
                        <ProductEdit />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/admin/products" element={<ProductManagement />} />
                  <Route path="/admin/product/add" element={<AddProduct />} />
                  <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
                </Routes>
              </main>
              <Footer />
=======
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/track/:id" element={<OrderTracking />} />
                <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="coupons" element={<CouponManagement />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                <Route path="/products" element={<ProductList />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/orders" element={<Orders />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/product/:id/edit" 
                  element={
                    <ProtectedRoute isAdmin>
                      <ProductEdit />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/product/add" element={<AddProduct />} />
                <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
              </Routes>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
