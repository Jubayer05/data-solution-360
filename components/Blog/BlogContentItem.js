/* eslint-disable @next/next/no-img-element */
import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

const BlogContentItem = () => {
  const [blogItem, setBlogItem] = useState({});
  const { blogData } = useStateContext();
  // console.log(blogData);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.search;
      const queryParams = new URLSearchParams(url);
      const id = queryParams.get('id');

      const item = blogData.find((item) => item.id === id);
      setBlogItem(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto pt-24 px-2">
      <h2 className="text-5xl mt-4 pb-4">{blogItem?.title}</h2>
      {/* <h3 className="text-lg font-bold">{blogItem?.author}</h3> */}
      <h3 className="text-lg font-bold">Data Solution 360</h3>
      <p className="-mt-1 text-sm">Posted on {blogItem?.date}</p>
      {blogItem?.img ? (
        <img src={blogItem?.img} className="w-full" alt="" />
      ) : (
        <Empty description={false} />
      )}
      <div className="mt-4"></div>
      <div
        className="text-[22px] pb-8 leading-10"
        dangerouslySetInnerHTML={{ __html: blogItem?.details }}
      />
    </div>
  );
};

export default BlogContentItem;
