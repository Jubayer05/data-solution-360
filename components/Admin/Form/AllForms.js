import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { colors } from '../../../src/data/data';
import { loadData } from '../../../src/hooks/loadData';
import { formatFirestoreTimestamp } from '../../../src/utils/convertDate';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const AllForms = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    loadData('form_data', setFormData, {
      orderBy: 'createdAt',
      orderDirection: 'asc',
    });
  }, []);

  const groupedArr = Object.values(
    formData.reduce((acc, item) => {
      const title = item.courseData;

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

  const handleCopyFormLink = (item) => {
    const courseName = item?.courseData.replace(/\s+/g, '-');

    // Construct the link with the modified course name
    const link = `${window.location.origin}/registration/${courseName}?key=${item.id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Link Copied!',
          text: 'The form link has been copied to your clipboard.',
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to copy the link. Please try again.',
        });
        console.error('Error copying text: ', error);
      });
  };

  return (
    <div>
      <HeadingDashboard title="All Forms" />
      <div className="max-w-5xl mx-auto my-20">
        <div className="border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
            All Forms
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
                {item?.info
                  .slice() // Create a shallow copy of the array
                  .reverse() // Reverse the order to show the latest first
                  .map((product, idx) => (
                    <div key={product.id} className="border-1">
                      <Link href={`/admin/forms/${product.id}`}>
                        <div className="p-3">
                          <div className="flex items-center justify-center h-20 bg-gray-100 text-center font-heading text-lg font-bold text-gray-700">
                            Form - {idx + 1} {/* Display form number */}
                          </div>
                          <p className="text-gray-700 text-center mt-3 font-heading text-lg font-medium">
                            Created At:{' '}
                            <span className="font-bold">
                              {formatFirestoreTimestamp(product.createdAt)}
                            </span>
                          </p>
                        </div>
                      </Link>
                      <div className="flex items-center justify-between gap-2 p-3 border-t-1">
                        <Link href={`/admin/forms/${product.id}`}>
                          <ButtonDashboard className="bg-[#c10a6c] hover:bg-[#c10a6c] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1">
                            View
                          </ButtonDashboard>
                        </Link>

                        <ButtonDashboard
                          onClick={() => handleCopyFormLink(product)}
                          className="bg-[#1276e9] hover:bg-[#0865cf] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1"
                        >
                          Copy
                        </ButtonDashboard>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-10">
            <Link href="/admin/forms/new-form">
              <ButtonDashboard className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white">
                Create a new form
              </ButtonDashboard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllForms;
