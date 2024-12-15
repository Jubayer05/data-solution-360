import React, { useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
const db = firebase.firestore();

const AddCoupon = () => {
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    validUntil: '',
    isActive: true,
    usageLimit: '',
    usedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isActive' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { validUntil, ...rest } = formData;
      const formattedData = {
        ...rest,
        discount: Number(formData.discount),
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        validUntil: validUntil ? new Date().toISOString() : null,
      };

      db.collection('coupon_code')
        .add(formattedData)
        .then(() => {
          setFormData({
            code: '',
            discount: '',
            validUntil: '',
            isActive: true,
            usageLimit: '',
            usedCount: 0,
          });
          setIsLoading(false); // Set loading state to false
          Swal.fire('Done', 'Coupon code added successfully!', 'success').then(
            () => {
              window.location.reload();
            },
          );
        })
        .catch(() => {
          setIsLoading(false); // Set loading state to false
          Swal.fire('Failed!!!', 'Failed to add coupon.', 'error');
        });
    } catch (error) {
      setIsLoading(false); // Set loading state to false
      Swal.fire('Failed!!!', 'Failed to add coupon.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Add Coupon Code</h1>
      <form onSubmit={handleSubmit}>
        {/* Coupon Code */}
        <label
          htmlFor="code"
          className="font-semibold mt-3 block text-[#17012e]"
        >
          Coupon Code
        </label>
        <input
          placeholder="Enter coupon code (e.g., DISCOUNT10)"
          className="w-full px-4 py-3 text-lg outline-none border border-gray-300 mt-2 rounded"
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        {/* Discount */}
        <label
          htmlFor="discount"
          className="font-semibold mt-3 block text-[#17012e]"
        >
          Discount
        </label>
        <input
          placeholder="Enter discount amount (e.g., 10 or 50)"
          className="w-full px-4 py-3 text-lg outline-none border border-gray-300 mt-2 rounded"
          type="number"
          id="discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          required
        />

        {/* Valid Until */}
        <label
          htmlFor="validUntil"
          className="font-semibold mt-3 block text-[#17012e]"
        >
          Valid Until
        </label>
        <input
          placeholder="Select expiry date"
          className="w-full px-4 py-3 text-lg outline-none border border-gray-300 mt-2 rounded"
          type="date"
          id="validUntil"
          name="validUntil"
          value={formData.validUntil}
          onChange={handleChange}
        />

        {/* Active */}
        <label
          htmlFor="isActive"
          className="font-semibold mt-3 block text-[#17012e]"
        >
          Active
        </label>
        <input
          className="mt-2"
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />

        {/* Usage Limit */}
        <label
          htmlFor="usageLimit"
          className="font-semibold mt-3 block text-[#17012e]"
        >
          Usage Limit (Optional)
        </label>
        <input
          placeholder="Enter usage limit (e.g., 100)"
          className="w-full px-4 py-3 text-lg outline-none border border-gray-300 mt-2 rounded"
          type="number"
          id="usageLimit"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#17012e] text-white font-semibold py-3 mt-5 rounded hover:bg-[#2a004e] transition duration-300"
        >
          {isLoading ? 'Processing...' : 'Add Coupon'}
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
