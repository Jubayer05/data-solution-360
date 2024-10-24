import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const EditCourseData = () => {
  const { courseData, userEmail } = useStateContext();
  const handleDelete = (record) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('course_data')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <HeadingDashboard title="Manage Courses" />
      <div className="grid grid-cols-4 gap-5 my-5">
        {courseData?.map((product) => (
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
                onClick={() => handleDelete(product)}
                className="bg-[#f64e45] hover:bg-[#cb433b] hover:opacity-80 text-white text-sm pl-3 pr-3 pt-1 pb-1"
              >
                Delete
              </ButtonDashboard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCourseData;
