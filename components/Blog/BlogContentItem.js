/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { blogData } from "../../src/data/blog";

const BlogContentItem = () => {
  const [blogItem, setBlogItem] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = window.location.href.split("/").slice(-1)[0];
      const item = blogData.find((item) => item.slug === slug);
      setBlogItem(item);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-24">
      <h2 className="text-5xl mt-4 pb-4">{blogItem.title}</h2>
      <h3 className="text-lg font-bold">{blogItem.author}</h3>
      <p className="-mt-1">{blogItem.date}</p>
      <img src={blogItem.img} className="w-full" alt="" />
      <div className="mt-4"></div>
      <p className="text-xl pb-8">{blogItem.details}</p>
    </div>
  );
};

export default BlogContentItem;
