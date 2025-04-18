import React from 'react';
import { Link } from 'react-router-dom';
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
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
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
                            </li>
                        </ul>
                    </div>

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
                            </li>
                        </ul>
                    </div>

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
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
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
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
