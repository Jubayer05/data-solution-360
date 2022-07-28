/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../src/context/ContextProvider";

const BlogContentItem = () => {
  const [blogItem, setBlogItem] = useState({});
  const { blogData } = useStateContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = window.location.href.split("/").slice(-1)[0];
      const item = blogData.find((item) => item.slug === slug);
      setBlogItem(item);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-24">
      <h2 className="text-5xl mt-4 pb-4">{blogItem.title}</h2>
      <h3 className="text-lg font-bold">{blogItem.author}</h3>
      <p className="-mt-1 text-sm">Posted on {blogItem.date}</p>
      <img src={blogItem.img} className="w-full" alt="" />
      <div className="mt-4"></div>
      <div
        className="text-xl pb-8"
        dangerouslySetInnerHTML={{ __html: blogItem.details }}
      />
    </div>
  );
};

export default BlogContentItem;
