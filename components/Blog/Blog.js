import { Empty } from 'antd';
import { convert } from 'html-to-text';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { loadData } from '../../src/hooks/loadData';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    loadData('blogData', setBlogData, {
      orderBy: 'orderNo',
      orderDirection: 'asc',
    });
  }, []);

  return (
    <div className="pb-4 pt-20 max-w-6xl mx-auto">
      <h2 className="w-[600px] mx-auto text-center text-4xl font-bold font-heading mt-4 text-headerMain">
        Welcome to our blog section, where captivating content awaits!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {blogData.map((item) => (
          <div
            key={item.id}
            className="shadow-xl rounded-xl border overflow-hidden flex flex-col mt-6"
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
                <h2 className="text-2xl font-bold font-bangla cursor-pointer transition-colors duration-300">
                  <Link
                    href={`/blog/${encodeURIComponent(item.slug)}?id=${
                      item.id
                    }`}
                    className="text-black hover:text-red-400 "
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-lg font-bangla">
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
              <h3 className="text-gray-600 underline text-base">
                {/* {item.author} */}
                Data Solution 360
              </h3>
              <h4 className="text-gray-400">{item.date}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
