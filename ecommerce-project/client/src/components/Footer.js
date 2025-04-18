import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Về chúng tôi</h3>
                        <p className="mb-4">
                            Chúng tôi cung cấp những sản phẩm chất lượng cao với giá cả hợp lý, 
                            đảm bảo trải nghiệm mua sắm tốt nhất cho khách hàng.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="hover:text-blue-500 transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                               className="hover:text-blue-400 transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                               className="hover:text-pink-500 transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                               className="hover:text-blue-600 transition-colors">
                                <FaLinkedin size={24} />
=======

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold mb-4">Giới thiệu về E-Shop</h3>
                        <p className="text-gray-400">
                        Điểm đến duy nhất cho mọi nhu cầu mua sắm của bạn. Sản phẩm chất lượng, giá cả tuyệt vời và dịch vụ khách hàng tuyệt vời.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com" className="hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="hover:text-white">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
<<<<<<< HEAD
                        <h3 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-white transition-colors">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white transition-colors">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Liên hệ
                                </Link>
=======
                        <h3 className="text-white text-lg font-bold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products" className="hover:text-white">Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-white">Danh mục</Link>
                            </li>
                            <li>
                                <Link to="/deals" className="hover:text-white">Ưu đãi đặc biệt</Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals" className="hover:text-white">Sản phẩm mới</Link>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
                            </li>
                        </ul>
                    </div>

<<<<<<< HEAD
                    {/* Categories */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Danh mục</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/category/electronics" className="hover:text-white transition-colors">
                                    Điện tử
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/clothing" className="hover:text-white transition-colors">
                                    Thời trang
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/books" className="hover:text-white transition-colors">
                                    Sách
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/accessories" className="hover:text-white transition-colors">
                                    Phụ kiện
                                </Link>
=======
                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Dịch vụ khách hàng</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/contact" className="hover:text-white">Liên hệ chúng tôi</Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="hover:text-white">Thông tin vận chuyển</Link>
                            </li>
                            <li>
                                <Link to="/returns" className="hover:text-white">Trả hàng</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-white">Câu hỏi thường gặp</Link>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
                            </li>
                        </ul>
                    </div>

<<<<<<< HEAD
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Thông tin liên hệ</h3>
                        <ul className="space-y-2">
                            <li>
                                <p>Địa chỉ: 123 Đặng Thùy Trâm, Bình Thạnh, TP.HCM</p>
                            </li>
                            <li>
                                <p>Email: khoitran@.com</p>
                            </li>
                            <li>
                                <p>Điện thoại: (332) 329-0280</p>
                            </li>
                            <li>
                                <p>Giờ làm việc: T2-T6, 9:00 - 18:00</p>
                            </li>
                        </ul>
=======
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Đăng ký nhận cập nhật, truy cập vào ưu đãi đặc biệt và nhiều hơn nữa.
                        </p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Đăng ký
                            </button>
                        </form>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
<<<<<<< HEAD
                        <p className="text-sm">
                            © {new Date().getFullYear()} NICE SHOP. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                                Chính sách bảo mật
                            </Link>
                            <Link to="/terms" className="text-sm hover:text-white transition-colors">
                                Điều khoản sử dụng
                            </Link>
                            <Link to="/shipping" className="text-sm hover:text-white transition-colors">
                                Chính sách vận chuyển
                            </Link>
                        </div>
=======
                        <div className="text-sm text-gray-400 mb-4 md:mb-0">
                            © 2025 E-Shop. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                                Chính sách bảo mật
                            </Link>
                            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                                Điều khoản dịch vụ
                            </Link>
                            <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white">
                                Bản đồ trang web
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                                 alt="Visa" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                                 alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" 
                                 alt="PayPal" className="h-6" />
                        </div>
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
                    </div>
                </div>
            </div>
        </footer>
    );
<<<<<<< HEAD
};
=======
}
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9

export default Footer;
