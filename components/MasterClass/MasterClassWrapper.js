import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const LottieAnimation = dynamic(
  () => import('../utilities/Home/LottieAnimation'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
    ), // Loading placeholder
  },
);

import * as animationData from '../../src/data/json/form_animation.json';
import useFetchDocById from '../../src/hooks/manageDataById/useLoadDocumentById';
import MasterClass from './MasterClass';

const MasterClassWrapper = () => {
  const router = useRouter();
  const { key } = router.query;
  const { data, loading, error } = useFetchDocById('form_data', key);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="bg-[#fff9f272] font-form pb-20">
      {/* Background images for left and right corners */}
      <Image
        width={500}
        height={500}
        src="/Background/top-left.png"
        alt="DS-360"
        className="w-32 md:w-80 absolute left-0 top-0 -z-10"
      />
      <Image
        width={500}
        height={500}
        src="/Background/top-right.png"
        alt="DS-360"
        className="w-32 md:w-80 absolute right-0 top-0 -z-10"
      />

      <div>
        <Image
          width={500}
          height={500}
          src="/logo/logo_dashboard.png"
          alt="DS-360"
          className="w-[180px] md:w-[300px] z-50 mx-auto pt-10"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5 max-w-[1400px] mx-auto px-4">
        {/* LEFT SIDE */}
        <div className="flex-1 text-center md:text-left">
          <div className="w-[250px] md:w-[350px] mx-auto mt-6">
            <LottieAnimation animationData={animationData} />
          </div>

          <h2 className="text-2xl md:text-6xl font-bold mt-8 mb-6 text-gray-900 md:leading-[64px]">
            <span className="block">
              <strong className="text-blue-600">{data?.courseData}</strong>
            </span>
          </h2>
          <h2 className="block text-green-600 text-2xl md:text-4xl font-bold">
            Free Masterclass
          </h2>
          <h2 className="block mt-4 text-red-500 font-semibold tracking-wide text-3xl md:text-4xl">
            Register Today – Spots Are Limited!
          </h2>

          <div
            dangerouslySetInnerHTML={{ __html: data?.formDetails }}
            className="text-base mt-4 mx-4 md:mx-0 override-bg"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 mt-8 md:mt-20">
          <MasterClass />
        </div>
      </div>
    </div>
  );
};

export default MasterClassWrapper;
