import { Empty } from 'antd';
import { convert } from 'html-to-text';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBlog } from 'react-icons/fa';
import { loadData } from '../../src/hooks/loadData';

const BlogHome = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    loadData('blogData', setBlogData, {
      orderBy: 'orderNo',
      orderDirection: 'asc',
    });
  }, []);

  const selectedBlog = blogData?.slice(0, 3);

  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 mb-20 px-3" id="courses">
      <div className="max-w-6xl bg-white relative mx-auto rounded-lg shadow bg-cover bg-center overflow-hidden">
        <div className="w-full h-full  absolute" />
        <div className="flex justify-center">
          <div className="py-4 md:py-8 z-50">
            <div className="flex items-center gap-3">
              <h2 className="text-center text-[26px] md:text-[36px] font-bold font-heading m-0 text-black flex justify-center items-center gap-3">
                Blogs
                <span className="text-[#12b76a]">
                  <FaBlog />
                </span>
              </h2>
              <div className="flex-1 h-[1px] bg-[#eaecf0]" />
              <div className="text-center ">
                <Link href="/blog" className="inline-block">
                  <button
                    className="text-base font-semibold px-4 pb-3 pt-2 border-2 rounded-md
               bg-[#101828] transition-all duration-300 ease-linear hover:bg-white hover:text-[#101828]
                text-white border-[#101828]"
                  >
                    Explore All Blogs
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch flex-wrap gap-6 mt-8 max-w-5xl mx-auto">
              {selectedBlog?.map((item) => (
                <div
                  key={item.id}
                  className="shadow-xl rounded-xl border overflow-hidden flex flex-col mt-6 bg-white"
                >
                  {item.img ? (
                    <Image
                      width={500}
                      height={300}
                      className="h-[250px]"
                      src={item.img}
                      alt=""
                    />
                  ) : (
                    <Empty className="h-[250px] pt-16" description={false} />
                  )}

                  <div className="p-4 flex-1">
                    <div>
                      <h2 className="text-[20px] font-bold font-bangla cursor-pointer transition-colors duration-300">
                        <Link
                          href={`/blog/${encodeURIComponent(item.slug)}?id=${
                            item.id
                          }`}
                          className="text-black hover:text-red-400 "
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <p className="text-base font-bangla">
                        {convert(item?.details, {
                          wordwrap: 130,
                        })
                          .split(' ')
                          .slice(0, 15)
                          .join(' ')}
                        ...
                      </p>
                    </div>
                  </div>
                  <div className="pb-2 px-4 flex justify-between">
                    <h3 className="text-gray-600 underline text-sm">
                      {/* {item.author} */}
                      Data Solution 360
                    </h3>
                    {/* <h4 className="text-gray-400 text-sm">{item.date}</h4> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
