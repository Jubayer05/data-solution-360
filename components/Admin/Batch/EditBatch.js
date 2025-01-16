import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import { Spin } from 'antd';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';

const db = firebase.firestore();

const EditBatch = () => {
  const [selectedInstructor, setSelectedInstructor] = useState([]);
  const [batchNumber, setBatchNumber] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const router = useRouter();
  const { batchId } = router.query;
  const [instructor, setInstructor] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData('instructors', setInstructor);
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  useEffect(() => {
    if (courseDataBatch.length > 0 && batchId) {
      const batchInfo = courseDataBatch.find(
        (item) => item.unique_batch_id === batchId,
      );
      setSelectedInstructor(batchInfo?.instructors || []);
      setBatchNumber(batchInfo?.batchNumber);
    }
  }, [courseDataBatch, batchId]);

  const findBatchInfo = courseDataBatch?.find(
    (item) => item.unique_batch_id === batchId,
  );

  const handleChange = (record) => {
    if (
      selectedInstructor?.findIndex((item) => item?.id === record.value.id) ===
      -1
    ) {
      setSelectedInstructor([...selectedInstructor, record.value]);
    }
  };

  const handleUpdateBatch = () => {
    setLoading(true);
    const updatedCourse = {
      ...findBatchInfo,
      courseData: {
        ...findBatchInfo.courseData,
        discounted_price: discountedPrice,
      },
      batchNumber: batchNumber,
      instructors: selectedInstructor,
    };

    db.collection('course_data_batch')
      .doc(findBatchInfo.id)
      .update(updatedCourse)
      .then(() => {
        db.collection('course_data')
          .doc(findBatchInfo.courseData.key)
          .update({
            discounted_price: discountedPrice,
          })
          .then(() => {
            setLoading(false);
            Swal.fire(
              'Batch updated!',
              'Your batch has been updated.',
              'success',
            ).then(() => {
              window.location.reload();
            });
          });
      });
  };

  const selectInstructor = instructor.map((item) => ({
    label: (
      <div className="flex items-center gap-4">
        <Image
          width={500}
          height={300}
          className="w-10 h-10 rounded-full"
          src={item.photoUrl}
          alt={item.profileName}
        />
        <div>
          <p className="text-lg m-0 font-semibold">{item.profileName}</p>
          <p className="ml-1 text-sm m-0">{item.jobTitle}</p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const handleRemoveInstructor = (record) => {
    const updatedInstructors = selectedInstructor.filter(
      (item) => item.id !== record.id,
    );
    setSelectedInstructor(updatedInstructors);
  };

  return (
    <div>
      <HeadingDashboard title="Edit batch" />
      <div className="max-w-3xl mx-auto my-20">
        <div className="border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-center text-[#231f40] font-medium font-dash_heading ">
            <span className="font-bold">Edit the batch info</span>
          </h2>

          {findBatchInfo ? (
            <div>
              <p className="text-base font-dash_heading">
                <strong>Program Title:</strong>{' '}
                <strong className="text-[#645cfc]">
                  {findBatchInfo?.courseData?.item_name}
                </strong>
              </p>

              <p className="text-base font-dash_heading mt-2 mb-8">
                <strong>Current Batch Number:</strong>{' '}
                <strong className="text-[#645cfc]">
                  {findBatchInfo?.batchNumber}
                </strong>
              </p>

              <label
                htmlFor="batch_number"
                className="font-semibold mt-3 block text-[#17012e]"
              >
                Edit batch number
              </label>
              <input
                placeholder="Example - 2401"
                className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
                type="text"
                id="batch_number"
                onChange={(e) => setBatchNumber(e.target.value)}
              />

              <label
                htmlFor="course_price"
                className="font-semibold mt-3 block text-[#17012e]"
              >
                Edit course price
              </label>
              <input
                placeholder="Example - 2401"
                className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
                type="number"
                id="course_price"
                onChange={(e) => setDiscountedPrice(e.target.value)}
                onWheel={(e) => e.target.blur()}
              />

              <p className="text-lg font-bold font-dash_heading mt-3 block text-[#17012e]">
                Instructors for the entire course
              </p>
              <div className="grid grid-cols-4 gap-5 mt-5">
                {selectedInstructor?.map((item) => (
                  <div
                    key={item.key}
                    className="border-1 relative cursor-pointer group"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveInstructor(item)}
                      className="absolute -top-3 -right-3 z-50 w-[28px] h-[28px] bg-white hover:bg-[#ff5722] 
                    rounded-full flex justify-center items-center border hover:text-white opacity-0 group-hover:opacity-100"
                    >
                      <Trash className="text-red-500 cursor-pointer" />
                    </button>
                    <div className="p-3 ">
                      <Image
                        width={500}
                        height={300}
                        className="w-[120px] rounded-full h-[120px] mx-auto shadow border "
                        src={item?.photoUrl}
                        alt=""
                      />
                      <p className="text-gray-700 text-center mt-3 font-heading text-lg font-medium">
                        <span className="font-bold">{item?.profileName}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-semibold mt-3 block text-[#17012e]">
                Select Instructors for this batch
              </p>
              <Select
                className="w-full"
                styles={customStyles}
                options={selectInstructor}
                onChange={handleChange}
              />

              <div className="flex justify-center mt-10">
                <ButtonDashboard
                  onClick={handleUpdateBatch}
                  className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
                >
                  {loading ? (
                    <>
                      {' '}
                      <Spin size="medium" style={{ color: 'white' }} />{' '}
                      Updating...
                    </>
                  ) : (
                    'Update batch'
                  )}
                </ButtonDashboard>
              </div>
            </div>
          ) : (
            <div className="min-h-10 flex justify-center items-center">
              <Spin size="medium" />
            </div>
          )}
        </div>

        <div className="border border-gray-300 shadow-lg rounded-lg p-6 mt-20 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">
            Rules for Creating a New Batch
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Students will only have access to the content from the batch they
              are enrolled in.
            </li>
            <li>
              Students enrolled in a specific batch will not receive updates or
              content from other batches.
            </li>
            <li>
              Once enrolled, students will not receive new content added to
              other batches unless they re-enroll in those batches.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EditBatch;

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  control: (_, {}) => ({
    display: 'flex',
    border: '1px solid #e5e5e5',
    padding: '5px 10px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
  }),
};
