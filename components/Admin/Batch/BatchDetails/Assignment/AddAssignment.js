import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../../../firebase';
import { loadData } from '../../../../../src/hooks/loadData';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import RichTextEditorJodit from '../../../../utilities/RichTextEditor/RichTextEditor';
import InputBox from '../../../Course/InputBox';

const db = firebase.firestore();

const AddAssignment = () => {
  const [assignmentDetails, setAssignmentDetails] = useState('');
  const [classDate, setClassDate] = useState('');
  const [title, setTitle] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { batchId } = router.query;

  const findCourseData = courseDataBatch.find((item) => item.id === batchId);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  const handleAddAssignment = async () => {
    // Basic form validation
    if (!title || !classDate || !assignmentDetails) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    // Date validation: prevent past dates
    if (new Date(classDate) < new Date()) {
      Swal.fire('Error', 'Assignment deadline cannot be in the past.', 'error');
      return;
    }

    // Assignment data object
    const assignmentContent = {
      id: uuidv4().split('-')[0],
      title: title,
      description: assignmentDetails,
      submission_date: classDate,
      submitted_students: [],
      total_marks: totalMarks,
      start_date: new Date().toISOString(), // More readable date
    };

    const newCourseData = {
      ...findCourseData,
      assignment_data: [
        ...(findCourseData?.assignment_data || []),
        assignmentContent,
      ],
    };

    try {
      setLoading(true); // Start loading
      // Firestore update
      await db
        .collection('course_data_batch')
        .doc(findCourseData?.id)
        .update(newCourseData);

      Swal.fire('Success', 'Assignment added successfully!', 'success').then(
        () => {
          window.location.reload();
        },
      );

      // Reset input fields to initial state
      setTitle('');
      setClassDate('');
      setAssignmentDetails('');
    } catch (error) {
      console.error('Error adding assignment:', error);
      Swal.fire(
        'Error',
        'Failed to add assignment. Please try again.',
        'error',
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-20">
      <div className="border-1 p-5 rounded-lg bg-white mt-10">
        <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading">
          Add New Assignment
        </h2>

        <div className="max-w-5xl mx-auto">
          {/* Assignment Title Input */}
          <div className="flex gap-3 items-end">
            <InputBox
              className="py-1"
              title="Add a title for the new assignment"
              placeholder="Week - 1: Excel for Data Analysis and Data Science"
              type="text"
              value={title}
              func={(id, value) => setTitle(value)}
            />
          </div>

          {/* Assignment Deadline Input */}
          <div className="flex gap-3 items-end mt-5">
            <InputBox
              className="py-1"
              title="Assignment Deadline"
              type="date"
              value={classDate}
              func={(id, value) => setClassDate(value)}
            />
            <InputBox
              className="py-1"
              title="Total Marks"
              placeholder="10"
              type="number"
              onWheel={(e) => e.target.blur()}
              value={totalMarks}
              func={(id, value) => setTotalMarks(value)}
            />
          </div>

          {/* Rich Text Editor for Assignment Details */}
          <div className="-mt-5">
            <RichTextEditorJodit
              onDataChange={setAssignmentDetails}
              title="Assignment Details"
            />
          </div>

          {/* Submit Button with Spinner */}
          <div className="flex justify-center mt-8">
            <ButtonDashboard
              onClick={handleAddAssignment}
              className="bg-primary_btn hover:bg-[#002346bc] text-white"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <Spin size="medium" /> // Show spinner when loading
              ) : (
                'Submit Assignment'
              )}
            </ButtonDashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;
