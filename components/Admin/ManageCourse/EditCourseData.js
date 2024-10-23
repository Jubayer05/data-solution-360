import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const EditCourseData = ({ item }) => {
  return (
    <div className="grid grid-cols-4 gap-5 mt-5">
      {item?.map((product) => (
        <div key={product.key} className="border-1 bg-white rounded">
          <div className="p-3">
            <Image
              width={500}
              height={300}
              className="full"
              src={product.img}
              alt=""
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-3 border-t-1">
            <Link href={`/admin/course/edit-course/${product?.key}`}>
              <ButtonDashboard className="bg-[#645cfc] hover:bg-[#5750e5] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1">
                Edit
              </ButtonDashboard>
            </Link>

            <ButtonDashboard
              onClick={() => handleDeleteBatch(product)}
              className="bg-[#f64e45] hover:bg-[#cb433b] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1"
            >
              Delete
            </ButtonDashboard>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditCourseData;
