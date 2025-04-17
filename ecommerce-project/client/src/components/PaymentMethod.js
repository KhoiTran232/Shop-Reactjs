import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const PaymentMethodSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .required('Vui lòng chọn phương thức thanh toán')
    .oneOf(['CASH', 'CARD'], 'Phương thức thanh toán không hợp lệ')
});

function PaymentMethod({ onSubmit, isLoading = false }) {
  // Additional payment methods
  const paymentMethods = [
    { id: 'COD', label: 'Cash on Delivery', icon: 'cash-icon' },
    { id: 'CARD', label: 'Credit/Debit Card', icon: 'card-icon' },
    { id: 'VNPAY', label: 'VNPay', icon: 'vnpay-icon' },
    { id: 'MOMO', label: 'MoMo', icon: 'momo-icon' }
  ];

  return (
    <Formik
      initialValues={{ paymentMethod: '' }}
      validationSchema={PaymentMethodSchema}
      onSubmit={(values) => {
        // Log giá trị trước khi submit
        console.log('Selected payment method:', values.paymentMethod);
        onSubmit(values.paymentMethod);
      }}
    >
      {({ errors, touched }) => (
        <Form className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Chọn phương thức thanh toán</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Field
                type="radio"
                name="paymentMethod"
                value="CASH"
                className="h-4 w-4 text-blue-600"
                disabled={isLoading}
              />
              <label className="ml-2">Thanh toán khi nhận hàng</label>
            </div>

            <div className="flex items-center">
              <Field
                type="radio"
                name="paymentMethod"
                value="CARD"
                className="h-4 w-4 text-blue-600"
                disabled={isLoading}
              />
              <label className="ml-2">Thẻ tín dụng/Thẻ ghi nợ</label>
            </div>
          </div>

          {errors.paymentMethod && touched.paymentMethod && (
            <div className="text-red-500 text-sm mt-2">{errors.paymentMethod}</div>
          )}

          <button
            type="submit"
            className={`w-full mt-4 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-2 px-4 rounded-md transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

PaymentMethod.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default PaymentMethod;
