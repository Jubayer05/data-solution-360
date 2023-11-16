import React, { useEffect, useState } from 'react';

const ComingSoon = () => {
  const [linkUrl, setLinkUrl] = useState([]);
  useEffect(() => {
    setLinkUrl(window?.location.href.split('/'));
  }, []);
  return (
    <div className="h-[400px] flex justify-center items-center bg-slate-100">
      <h1 className="text-center text-4xl font-bold font-heading text-black capitalize">
        {linkUrl[linkUrl.length - 1]} Page is Coming Soon!
      </h1>
    </div>
  );
};

export default ComingSoon;
