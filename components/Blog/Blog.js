/* eslint-disable @next/next/no-img-element */
import { convert } from 'html-to-text';
import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

const Blog = () => {
  const { blogData } = useStateContext();

  // const text = ;

  // console.log(text);

  return (
    <div className="pb-4 pt-20 max-w-6xl mx-auto">
      <h2 className="text-center mt-6 pb-4 text-5xl text-gray-600">
        Welcome to Blog Section
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {blogData.map((item) => (
          <div
            key={item.id}
            className="shadow-xl rounded-xl overflow-hidden flex flex-col mt-6"
          >
            <img src={item.img} alt="" />

            <div className="p-4 flex-1">
              <div>
                <h2 className="text-2xl font-bold cursor-pointer transition-colors duration-300">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="text-black hover:text-red-400 "
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-lg">
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
                {item.author}
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
