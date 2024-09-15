import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import Image from 'next/image';
import Link from 'next/link';
import { colors } from '../../../src/data/data';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const AllBatch = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch, {
      orderBy: 'batchNumber',
      orderDirection: 'asc',
    });
  }, []);

  const groupedArr = Object.values(
    courseDataBatch.reduce((acc, item) => {
      const title = item.courseData.title;

      // Check if the title exists in the accumulator, if not, initialize it
      if (!acc[title]) {
        acc[title] = {
          title: title,
          info: [],
        };
      }

      // Push the current item to the appropriate info array
      acc[title].info.push(item);

      return acc;
    }, {}),
  );

  return (
    <div>
      <HeadingDashboard title="All Batch" />
      <div className="max-w-5xl mx-auto my-20">
        <div className="border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
            All Batch
          </h2>

          {groupedArr.map((item, index) => (
            <div key={item.title} className={`mt-10`}>
              <h2
                className="text-xl text-[#231f40] font-bold font-dash_heading "
                style={{ color: colors[index + 2] }}
              >
                {item.title}
              </h2>
              <div className="grid grid-cols-4 gap-5 mt-5">
                {item?.info.map((product) => (
                  <div key={item.key} className="">
                    <Link href={`/admin/course/${product.id}`}>
                      <div className="border-1 p-3">
                        <Image
                          width={500}
                          height={300}
                          className="full"
                          src={product.courseData.img}
                          alt=""
                        />
                        <p className="text-gray-700 text-center mt-3 font-heading text-lg font-medium">
                          Batch No:{' '}
                          <span className="font-bold">
                            {product.batchNumber}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-10">
            <ButtonDashboard className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white">
              Create a new batch
            </ButtonDashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBatch;
