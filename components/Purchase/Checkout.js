import { Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { loadData } from '../../src/hooks/loadData';
import Payment from './Payment';

const Checkout = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [allCourseData, setAllCourseData] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setAllCourseData);
  }, []);

  const findBatchData = allCourseData.find(
    (checkout) => checkout.id === courseId,
  );

  const findCheckoutCourse = findBatchData?.courseData;

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-5 bg-[#fdfdfd] shadow rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-3 font-heading">
        Complete Your Payment
      </h2>
      <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />

      <div className="flex items-start gap-8">
        <div className="flex-[55%] bg-white shadow p-6 rounded-lg">
          {/* NOTE: COURSE DETAILS */}
          {findCheckoutCourse ? (
            <div>
              <div className="flex items-center gap-4">
                <Image
                  width={300}
                  height={200}
                  src={findCheckoutCourse.img}
                  alt={findCheckoutCourse.course_name}
                  className="w-[120px] rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-bold">
                    {findCheckoutCourse.title}
                  </h2>
                </div>
              </div>
              <div className="mt-7">
                <p className="text-base font-bold">Payment Details</p>
                <div className="w-full flex justify-between">
                  <p>Course Price</p>
                  <p className="text-sm text-gray-600 flex items-center font-medium">
                    <TbCurrencyTaka />
                    {findCheckoutCourse.price}
                  </p>
                </div>
                {findCheckoutCourse.discounted_price && (
                  <div className="w-full flex justify-between mt-1">
                    <p>
                      Discount{' '}
                      <span className="text-primary">
                        (
                        {Math.round(
                          ((findCheckoutCourse.price -
                            findCheckoutCourse.discounted_price) /
                            findCheckoutCourse.price) *
                            100,
                        )}
                        % off)
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center font-medium">
                      -<TbCurrencyTaka />
                      {findCheckoutCourse.price -
                        findCheckoutCourse.discounted_price}
                    </p>
                  </div>
                )}
                <div className="mt-1 h-[.5px] w-[100%] bg-slate-300 " />
                <div className="w-full flex justify-between mt-2">
                  <p className="font-semibold">Total Payment</p>
                  <p className="text-sm text-gray-600 flex items-center font-medium">
                    <TbCurrencyTaka />
                    {findCheckoutCourse.discounted_price
                      ? findCheckoutCourse.discounted_price
                      : findCheckoutCourse.price}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Spin size="small" />
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
        <div className="flex-[40%] bg-white shadow p-6 rounded-lg">
          <Payment
            batchData={findBatchData}
            payableAmount={
              findCheckoutCourse?.discounted_price
                ? findCheckoutCourse?.discounted_price
                : findCheckoutCourse?.price
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
