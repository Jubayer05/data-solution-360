import { Empty } from 'antd';
import { convert } from 'html-to-text';
import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

const BlogHome = () => {
  const { blogData } = useStateContext();

  const selectedBlog = blogData?.slice(0, 3);

  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 mb-20 px-3" id="courses">
      <div
        style={{ backgroundImage: "url('/Background/bg-4.jpg')" }}
        className="max-w-6xl relative mx-auto rounded-lg shadow bg-cover bg-center overflow-hidden"
      >
        <div className="w-full h-full bg-black opacity-70 absolute" />
        <div className="flex justify-center">
          <div className="py-4 md:py-8 z-50">
            <h2 className="text-center text-3xl font-bold font-heading mt-4 text-white">
              Explore our blog for captivating content.
            </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch flex-wrap gap-6 mt-8 max-w-5xl mx-auto">
              {selectedBlog?.map((item) => (
                <div
                  key={item.id}
                  className="shadow-xl rounded-xl border overflow-hidden flex flex-col mt-6 bg-white"
                >
                  {item.img ? (
                    <img className="h-[250px]" src={item.img} alt="" />
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
                    <h4 className="text-gray-400 text-sm">{item.date}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/blog" className="inline-block mt-4">
                <button
                  className="text-base font-semibold px-4 pb-3 pt-2 border-2 rounded-md
               bg-primary-bg transition-all duration-300 ease-linear hover:bg-white hover:text-primary
                text-white border-primary"
                >
                  Explore All Blogs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
