import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { loadData } from '../../src/hooks/loadData';
import useFetchDocById from '../../src/hooks/manageDataById/useLoadDocumentById';
import ButtonDashboard from '../utilities/dashboard/ButtonDashboard';
import Payment from './Payment';

const Checkout = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [allCourseData, setAllCourseData] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState([]);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [findCouponData, setFindCouponData] = useState();
  const [isCouponChecked, setIsCouponChecked] = useState(false); // Tracks if coupon check was attempted

  // Load course data
  useEffect(() => {
    loadData('course_data_batch', setAllCourseData);
    loadData('coupon_code', setCouponData);
  }, []);

  const findBatchData = allCourseData.find(
    (checkout) => checkout.id === courseId,
  );

  sessionStorage.setItem(
    'batchId',
    JSON.stringify(findBatchData?.unique_batch_id),
  );

  const findCheckoutCourse = findBatchData?.courseData;

  const { data, loading, error } = useFetchDocById(
    'course_data',
    findCheckoutCourse?.courseId,
  );

  console.log(data);

  // Calculate the total price after applying the coupon
  const calculateDiscountedPrice = () => {
    if (findCouponData?.isActive && data) {
      const discount = parseFloat(findCouponData?.discount / 100);
      const newPrice = data.discounted_price
        ? data.discounted_price
        : data.price;
      return parseInt(newPrice - newPrice * discount);
    }
    return data?.discounted_price || data?.price;
  };

  useEffect(() => {
    if (data) {
      const priceWithDiscount = calculateDiscountedPrice();
      setDiscountedTotal(priceWithDiscount);
    }
  }, [findCouponData, data]);

  const handleSubmitCoupon = () => {
    const findCoupon = couponData.find((item) => item.code === couponCode);

    setIsCouponChecked(true); // Mark that coupon validation was attempted

    if (findCoupon?.isActive) {
      setFindCouponData(findCoupon);
    } else {
      setFindCouponData(null); // Clear any previously valid coupon
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-5 bg-[#fdfdfd] shadow rounded-lg p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 font-heading">
        Complete Your Payment
      </h2>
      <div className="mt-3 mb-8 h-[.5px] w-full bg-slate-300" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-[55%] bg-white shadow p-4 sm:p-6 rounded-lg">
          {/* NOTE: COURSE DETAILS */}
          {!loading ? (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Image
                  width={300}
                  height={200}
                  src={data.img}
                  alt={data.course_name}
                  className="w-full sm:w-[120px] rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-bold">{data.title}</h2>
                </div>
              </div>
              <div className="mt-7">
                <p className="text-base font-bold">Payment Details</p>
                <div className="w-full flex justify-between">
                  <p>Course Price</p>
                  <p className="text-sm text-gray-600 flex items-center font-medium">
                    ৳ {data.price}
                  </p>
                </div>
                {data.discounted_price && (
                  <div className="w-full flex justify-between mt-1">
                    <p>
                      Discount{' '}
                      <span className="text-primary">
                        (
                        {Math.round(
                          ((data.price - data.discounted_price) / data.price) *
                            100,
                        )}
                        % off)
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center font-medium">
                      -৳ &nbsp;
                      {data.price - data.discounted_price}
                    </p>
                  </div>
                )}
                <div className="mt-1 h-[.5px] w-full bg-slate-300 " />
                <div className="w-full flex justify-between mt-2">
                  <p className="font-semibold">Total Payment</p>
                  <p className="text-sm text-gray-600 flex items-center font-medium">
                    ৳ &nbsp;
                    {data.discounted_price ? data.discounted_price : data.price}
                  </p>
                </div>

                <div className="mt-4">
                  {isCouponChecked && !findCouponData && (
                    <p className="text-red-500 mt-2">Invalid Coupon Code</p>
                  )}
                </div>

                {findCouponData && (
                  <div className="w-full flex justify-between mt-1">
                    <p className="text-green-500 mt-2">
                      Coupon Applied: {findCouponData?.discount}% off
                    </p>
                    <p className="text-sm text-gray-600 flex items-center font-medium">
                      -৳ &nbsp;
                      {data.discounted_price
                        ? Math.round(
                            data.discounted_price *
                              (findCouponData.discount / 100),
                          )
                        : data.discounted_price}
                    </p>
                  </div>
                )}

                {findCouponData && (
                  <div className="mt-1 h-[.5px] w-full bg-slate-300 " />
                )}

                {findCouponData && (
                  <div className="w-full flex justify-between mt-2">
                    <p className="font-semibold">
                      Total Payment (After Coupon)
                    </p>
                    <p className="text-sm text-gray-600 flex items-center font-medium">
                      ৳ &nbsp;{discountedTotal}
                    </p>
                  </div>
                )}
                <div className="flex gap-5 mt-5">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-[70%] p-3 border rounded-md"
                  />
                  <ButtonDashboard
                    onClick={handleSubmitCoupon}
                    className="w-[30%] bg-[#645cfc] hover:bg-[#5750e5] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1"
                  >
                    Apply
                  </ButtonDashboard>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <Spin size="small" />
            </div>
          )}

          {/* NOTE: PAYMENT FORM */}
          <div className="mt-8">
            <p className="text-base font-normal cursor-pointer">
              For any help call{' '}
              <span className="font-bold underline text-primary">
                01870106460
              </span>{' '}
              (10 am to 10 pm)
            </p>
          </div>
        </div>
        <div className="lg:flex-[40%] bg-white shadow p-4 sm:p-6 rounded-lg">
          <Payment
            batchData={findBatchData}
            payableAmount={discountedTotal || data?.price}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
