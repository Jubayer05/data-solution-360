import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { loadData } from '../../../src/hooks/loadData';
import { formatDate } from '../../../src/utils/convertDate';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const AllCoupons = () => {
  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    loadData('coupon_code', setCouponData, {
      orderBy: 'validUntil',
      orderDirection: 'asc',
    });
  }, []);

  const groupedArr = Object.values(
    couponData.reduce((acc, item) => {
      const title = item.courseData;

      // Check if the title exists in the accumulator, if not, initialize it
      if (!acc[title]) {
        acc[title] = {
          title: title,
          info: [],
        };
      }

      // Push the current item to the appropriate info array
      acc[title].info.push(item);

      return acc;
    }, {}),
  );

  const handleCopyFormLink = (item) => {
    const courseName = item?.courseData.replace(/\s+/g, '-');

    // Construct the link with the modified course name
    const link = `${window.location.origin}/registration/${courseName}?key=${item.id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Link Copied!',
          text: 'The form link has been copied to your clipboard.',
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to copy the link. Please try again.',
        });
        console.error('Error copying text: ', error);
      });
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
            {couponData?.map((product, idx) => (
              <div key={product.id} className="border-1">
                <Link href={`/admin/forms/${product.id}`}>
                  <div className="p-3">
                    <div className="flex items-center justify-center h-20 bg-gray-100 text-center font-heading text-lg font-bold text-gray-700">
                      Coupon - {product.code} {/* Display form number */}
                    </div>
                  </div>
                </Link>
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
                      {formatDate(product.validUntil)}
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
