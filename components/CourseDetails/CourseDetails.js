/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { crashCourseData } from "../../src/data/data";
import { useStateContext } from "../../src/context/ContextProvider";
import { ImClock } from "react-icons/im";
import { BiShareAlt } from "react-icons/bi";
import { GoCalendar } from "react-icons/go";
import {
  BsCalendarDay,
  BsCheck2Circle,
  BsClock,
  BsTelephone,
} from "react-icons/bs";

const CourseDetails = () => {
  const { courseData } = useStateContext();
  const [courseDetails, setCourseDetails] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = window.location.href.split("/").slice(-1)[0];
      console.log(slug);
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
    }
  }, [courseData]);

  console.log(courseData);

  return (
    <div className="flex items-start max-w-6xl mx-auto font-bangla font-bold">
      {/* NOTE: LEFT SIDE */}
      <div className="pt-32 p-5 flex-[.58 1] w-[60%]">
        <h2 className="text-5xl mb-6 -mt-20 font-[700] text-[#101828]">
          {courseDetails?.title}
        </h2>
        <p className="font-medium text-base">
          একটা এক্সসাইটিং জার্নিতে আপনাকে স্বাগতম। দেশের অন্যতম সেরা ট্রেইনারের
          কাছ থেকে শিখুন {courseDetails?.title}. আশা করি পুরো জার্নিটা এনজয়
          করবেন। শুভকামনা।
        </p>

        {/* NOTE: ORIENTATION SECTION */}
        <div className="flex items-center bg-[rgb(255,241,233)] px-4 py-3 mt-10 rounded">
          <img className="w-[60px] mr-4" src="/course/webinar.png" alt="" />
          <div>
            <span className="cursor-pointer">ফ্রি ওরিয়েন্টেশন ক্লাস</span>
            <div className="flex items-center text-base mt-1">
              <GoCalendar />
              <span className="ml-1.5">২ জুন, শুক্র - রাত ৯:০০</span>
            </div>
          </div>
          <div className="ml-auto">
            <button className="bg-[#1f0835] text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
              ফ্রি বুক করুন
            </button>
          </div>
        </div>

        {/* NOTE: COURSE DETAILS (BATCH, STARTING, DAY, TIME) */}
        <div className="border-l-2 mt-6 px-2 py-4 border-[#ffa36f] flex items-center gap-6">
          <div className="pl-3 pr-2">
            <div className="bg-[#ff8c4b] text-white py-1.5 px-2 text-xs rounded">
              <span>ব্যাচ ২</span>
            </div>
          </div>
          <div className="bg-[#d5caca] w-[2px] h-[40px]" />
          <div className="px-3">
            <div className="flex items-center text-xs pb-1.5">
              <GoCalendar className="text-[#ff8c4b] text-base" />
              <span className="ml-1.5 cursor-pointer">শুরু হবে</span>
            </div>
            <span>শুক্রবার ১৬, জুন</span>
          </div>
          <div className="bg-[#d5caca] w-[1px] h-[40px]" />
          <div className="px-3">
            <div className="flex items-center text-xs pb-1.5">
              <BsCalendarDay className="text-[#ff8c4b] text-base" />
              <span className="ml-1.5 cursor-pointer">ক্লাসের দিন</span>
            </div>
            <span> শনি, সোম, বুধ </span>
          </div>
          <div className="bg-[#d5caca] w-[1px] h-[40px]" />
          <div className="px-3">
            <div className="flex items-center text-xs pb-1.5">
              <BsClock className="text-[#ff8c4b] text-base" />
              <span className="ml-1.5 cursor-pointer">ক্লাসের সময়</span>
            </div>
            <span>রাত ৯:০০ - রাত ১০:৩০</span>
          </div>
        </div>

        {/* NOTE: COURSE INCLUDED ITEMS */}
        <div className="bg-[#101828] p-8 pl-12 font-normal text-[#eaecf0] rounded-lg mt-8">
          <div className="flex items-center gap-4">
            <div className="text-base">কোর্স চলাকালীন থাকবে</div>
            <div className="grow h-[.5px] bg-[#eaecf0]" />
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-12 mt-6">
            {/* NOTE: 1 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/seo.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#12b76a]">ইভালুয়েশান টেস্ট</p>
                <p className="m-0">রেগুলার টেস্টে ঝালিয়ে নিন নিজেকে</p>
              </div>
            </div>
            {/* NOTE: 2 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/support.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#6993ff]">সাপোর্ট ক্লাস</p>
                <p className="m-0">সমস্যা গুলোর সমাধান হবে নিয়মিত</p>
              </div>
            </div>
            {/* NOTE: 3 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/growth.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#ff8c4b]">
                  প্রোগ্রেস ট্র্যাকিং
                </p>
                <p className="m-0">থাকুন অলওয়েজ অন ট্র্যাক</p>
              </div>
            </div>
            {/* NOTE: 4 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/portfolio.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#ffab00]">ইন্টার্নশীপ অফার</p>
                <p className="m-0">বেস্ট স্টুডেন্টদের জন্য</p>
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: ABOUT COURSE  */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">কোর্স সম্পর্কে</h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          {/* <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
          /> */}
          {/* TODO: Remove it letter */}
          <div className="mt-4">
            <p className="text-lg font-normal">
              আপনি যদি একজন ডিজিটাল মার্কেটার হিসেবে আপনার ক্যারিয়ার গড়তে চান
              তাহলে আপনার জন্যই ওস্তাদের “Full Stack DIgital Marketing 2023”. আর
              আপনাদের ইন্সট্রাকশনে থাকবেন Skiluper এর ফাউন্ডার Shamim Hussain
              স্যার যার কাছে শিখে ফ্রিল্যান্সিং মার্কেটপ্লেসে এখন অনেকেই হাজার
              ডলারের বেশি ইনকাম করছেন।{" "}
            </p>
            <p className="text-lg">কোর্সটি কাদের জন্যঃ</p>
            <p className="text-lg font-normal">
              -পুরো কোর্স শেষ করার পর ডিজিটাল মার্কেটিং এর মাধ্যমে যাদের মাসিক
              অন্তত ১ লক্ষ টাকা ইনকাম করার প্ল্যানিং আছে এবং সেই পরিমাণ ইফোর্ট
              আপনি দিতে ইচ্ছুক তাদের জন্যই এই কোর্স।
            </p>
            <p className="text-lg">কোর্স শেষ করলেই কি আমি ইনকাম করতে পারবো?</p>
            <p className="text-lg font-normal">
              - পুরো কোর্সটিকে বেশ কয়েকটি মডিউলে সাজানো হয়েছে। প্রতিটি মডিউল শেষ
              হবার পর থাকবে কুইজ, টাস্ক এবং এসাইনমেন্ট- যার উপর আপনাদের মার্কিং
              হবে। আর একটি বেঞ্চমার্ক সেট করে দেয়া হবে। যারা এই বেঞ্চমার্ক হিট
              করতে পারবেন, তাদের সাথে আমাদের “ক্যারিয়ার গ্রোথ টিম” ডিরেক্টলি কাজ
              করবেন জব প্লেসমেন্ট এবং ফ্রিল্যান্সিং মার্কেটপ্লেস থেকে ইনকাম করা
              পর্যন্ত।
            </p>
          </div>
        </div>

        {/* NOTE: ABOUT INSTRUCTOR */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">ইন্সট্রাক্টর</h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          <div className="mt-8 border-l-[3px] border-[#4478ff] rounded-[4px] shadow-lg py-3 px-4 cursor-pointer flex items-center gap-4 hover:bg-[#eaecf0]">
            <img
              src="/team/sakib.jpg"
              className="w-[60px] h-[60px] rounded-full"
              alt=""
            />
            <div>
              <p className="m-0 text-xl text-[#1d2939] font-bold">
                Sakib Tarafder
              </p>
              <p className="m-0 text-base text-[#475467]">
                CEO at Data Solution - 360
              </p>
            </div>
          </div>
        </div>
        {/* NOTE: REQUIREMENTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">রিকোয়ারমেন্টস</h2>
          <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />
          <p className="text-lg font-normal pb-10">
            ইন্টারনেট সংযোগসহ ল্যাপটপ/ডেস্কটপ
          </p>
        </div>

        {/* NOTE: HELP */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">হেল্প</h2>
          <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />
          <p className="text-lg font-normal cursor-pointer">
            ব্যাচ সংক্রান্ত যেকোনো তথ্যের জন্যে কল করুন{" "}
            <span className="font-bold underline">01870106460</span> (সকাল ১০টা
            থেকে রাত ১০টা)
          </p>
        </div>
      </div>
      {/* NOTE: RIGHT SIDE */}
      <div className="my-2 flex-grow-[.42] pb-3 shrink w-[40%] sticky top-[-185px]">
        <div className="mb-3">
          <img
            src={courseDetails?.img}
            alt=""
            className="rounded-md w-[100%] h-[260px]"
          />
        </div>

        <div className="border-1 rounded-md">
          {/* NOTE: RIGHT HEADER */}
          <div className="flex items-center justify-center gap-4 border-b-1 py-4">
            <div className="flex bg-[#fff1e9] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(223,97,52)] mr-[6px]" />
              <span className="text-sm font-[700] tracking-wider">
                {23} দিন বাকি
              </span>
            </div>
            <div className="flex bg-[rgba(161,68,255,0.15)] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(120,12,208)] mr-[6px]" />
              <span className="text-sm font-[700] tracking-wider	 ">
                {23} টি সিট বাকি
              </span>
            </div>
          </div>

          {/* NOTE: PRICE & BUTTON */}
          <div className="py-4 px-5 border-b-1">
            <div className="flex items-center">
              <div>
                <span className="text-[orangered] font-bold text-lg">
                  <strike>৫০০০/-</strike>
                </span>
              </div>
              <div className="ml-4">
                <span className="text-[#1d2939] font-bold text-3xl">
                  ২০০০/-
                </span>
              </div>
              <div className="flex items-center ml-auto border-b-1 cursor-pointer">
                <BiShareAlt />
                <span>শেয়ার</span>
              </div>
            </div>
            <div>
              <button className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] mt-6 hover:opacity-[0.8] transition-all">
                জয়েন লাইভ ব্যাচ
              </button>
            </div>
          </div>
          {/* NOTE: COURSE DETAILS IN POINTS */}
          <div className="py-4 px-5 border-b-1">
            <p className="font-bold text-lg">এই কোর্সে আপনি পাচ্ছেন</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#3a4e67]">
              <div className="flex items-start">
                <BsCheck2Circle />
                <span className="ml-2 -mt-1">৮ মাসের স্টাডিপ্ল্যান</span>
              </div>
              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">
                  ওয়েব এনালিটিক্স & সার্ভার সাইড ট্র্যাকিং
                </span>
              </div>
              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">
                  ওয়েব এনালিটিক্স & সার্ভার সাইড
                </span>
              </div>
              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">৮ মাসের স্টাডিপ্ল্যান</span>
              </div>

              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">
                  ওয়েব এনালিটিক্স & সার্ভার সাইড
                </span>
              </div>
              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">
                  ওয়েব এনালিটিক্স & সার্ভার সাইড ট্র্যাকিং
                </span>
              </div>
              <div className="flex items-start ">
                <BsCheck2Circle className="text-base" />
                <span className="ml-2 -mt-1">৮ মাসের স্টাডিপ্ল্যান</span>
              </div>
            </div>
          </div>
          {/* NOTE: RIGHT BOTTOM */}
          <div className="py-4 px-5">
            <div className="flex justify-center items-center">
              <span className="flex items-center text-[orange] mr-2 cursor-pointer">
                <BsTelephone className="mr-2" />
                কল করুন ০১৮৭০১০৬৪৬০
              </span>
              <span>(সকাল ১০টা থেকে রাত ১০টা) </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
