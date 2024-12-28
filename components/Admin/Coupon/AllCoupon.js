import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';

import { format, fromUnixTime } from 'date-fns';
import Link from 'next/link';
import { RiDeleteBinLine } from 'react-icons/ri'; // Import the delete icon
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const AllCoupons = () => {
  const [couponData, setCouponData] = useState([]);
  useEffect(() => {
    loadData('coupon_code', setCouponData, {
      orderBy: 'validUntil',
      orderDirection: 'asc',
    });
  }, []);

  const handleCouponStatus = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change coupon status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Change coupon status
        db.collection('coupon_code')
          .doc(item.id)
          .update({
            isActive: !item.isActive,
          })
          .then(() => {
            Swal.fire('Status changed!', '', 'success').then(() => {
              window.location.reload();
            });
          });
      }
    });
  };

  const handleDeleteCoupon = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the coupon from the database
        db.collection('coupon_code')
          .doc(item.id)
          .delete()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The coupon has been deleted.',
              'success',
            ).then(() => {
              setCouponData((prevData) =>
                prevData.filter((coupon) => coupon.id !== item.id),
              ); // Update state
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the coupon.',
              'error',
            );
          });
      }
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = fromUnixTime(timestamp); // Convert seconds to Date object
    return format(date, 'yyyy-MM-dd HH:mm:ss'); // Format the date
  };
  return (
    <div>
      <HeadingDashboard title="All Coupons" />
      <div className="max-w-5xl mx-auto my-20">
        <div className="border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
            Coupon Data
          </h2>

          <div className="grid grid-cols-4 gap-5 mt-5">
            {couponData?.map((product) => (
              <div key={product.id} className="relative border-1 group">
                <div className="p-3">
                  <div className="flex items-center justify-center h-20 bg-gray-100 text-center font-heading text-lg font-bold text-gray-700">
                    Coupon - {product.code} {/* Display form number */}
                  </div>
                </div>
                <div className="p-3 border-t-1">
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Code Name:{' '}
                    <span className="font-bold text-primary">
                      {product.code}
                    </span>
                  </p>
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Discount:{' '}
                    <span className="font-bold text-blue-500">
                      {product.discount}%
                    </span>
                  </p>
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Valid Until:{' '}
                    <span className="font-bold text-orange-500">
                      {product.validUntil}
                    </span>
                  </p>
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Is Active:{' '}
                    <span
                      className={`font-bold ${
                        product.isActive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Used Count:{' '}
                    <span className="font-bold text-purple-500">
                      {product.usedCount || 0}
                    </span>
                  </p>
                  <p className="text-gray-500 font-heading text-lg font-medium">
                    Usage Limit:{' '}
                    <span
                      className={`font-bold ${
                        product.usageLimit === null
                          ? 'text-indigo-500'
                          : 'text-teal-500'
                      }`}
                    >
                      {product.usageLimit === null
                        ? 'Unlimited'
                        : product.usageLimit}
                    </span>
                  </p>
                  <div className="mt-4 text-center">
                    <button
                      className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                      onClick={() => handleCouponStatus(product)}
                    >
                      {product.isActive ? 'Inactive' : 'Active'}
                    </button>
                  </div>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 group-hover:translate-x-2">
                  <button
                    className="hover:bg-red-500 text-red-500 rounded-full border-2 border-red-500 bg-white hover:text-white hover:border-red-500 transition-all duration-200 ease-in-out p-2"
                    onClick={() => handleDeleteCoupon(product)}
                  >
                    <RiDeleteBinLine size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/admin/coupons/new-coupon">
              <ButtonDashboard className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white">
                Create a Coupon
              </ButtonDashboard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoupons;
