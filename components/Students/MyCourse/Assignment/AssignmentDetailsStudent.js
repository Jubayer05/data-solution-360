import { Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../../firebase';
import { useStateContext } from '../../../../src/context/ContextProvider';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import InputBox from '../../../Admin/Course/InputBox';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const db = firebase.firestore();

const AssignmentDetailsStudent = () => {
  const { findCurrentUser } = useStateContext();
  const { enrolledCourse } = useEnrolledCourseData();
  const [assignmentLink, setAssignmentLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  const { assignmentId } = router.query;

  const findAssignment = enrolledCourse?.assignment_data?.find(
    (item) => item.id === assignmentId,
  );

  const findUserAssignment = findAssignment?.submitted_students?.find(
    (user) => user.student_id === findCurrentUser?.student_id,
  );

  const courseData = {
    ...enrolledCourse,
    assignment_data: [
      // Filter out the old assignment data
      ...(enrolledCourse?.assignment_data || []).filter(
        (item) => item.id !== assignmentId,
      ),
      // Add updated assignment with new submission
      {
        ...findAssignment,
        submitted_students: [
          // Safely handle if submitted_students doesn't exist
          ...(findAssignment?.submitted_students || []),
          {
            student_id: findCurrentUser?.student_id,
            submittedAt: new Date().toISOString(),
            assignmentLink: assignmentLink,
            full_name:
              findCurrentUser?.full_name || findCurrentUser?.primary_number,
          },
        ],
      },
    ],
  };

  const handleSubmitAssignment = async () => {
    if (assignmentLink) {
      // Check if the student has already submitted the assignment
      const hasAlreadySubmitted = findUserAssignment !== undefined;

      if (hasAlreadySubmitted) {
        Swal.fire({
          title: 'Duplicate Submission',
          text: 'You have already submitted your assignment. You cannot submit again.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return; // Prevent further execution
      }

      setLoading(true); // Start loading
      try {
        // Mock submission process (replace with actual API call or Firebase submission)
        await db
          .collection('course_data_batch')
          .doc(enrolledCourse?.id) // Create a collection for submitted assignments
          .update(courseData);

        // Notify the user of successful submission
        Swal.fire({
          title: 'Submission Successful',
          text: 'Your assignment link has been submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
        });
        setHasSubmitted(true);
        setAssignmentLink(''); // Clear the assignment link
      } catch (error) {
        console.error('Error submitting assignment:', error);

        // Notify the user of failure
        Swal.fire({
          title: 'Submission Failed',
          text: 'There was an issue submitting your assignment. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false); // End loading
      }
    } else {
      // Notify the user to provide an assignment link
      Swal.fire({
        title: 'No Assignment Link',
        text: 'Please enter an assignment link before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      console.log('Please enter an assignment link');
    }
  };

  return (
    <div>
      <div>
        {/* NOTE: LESSONS LIST */}
        <div className="flex-1 border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl text-center pb-4 text-[#231f40] font-medium font-dash_heading ">
            Assignment
          </h2>

          {findAssignment ? (
            <h2 className="text-xl pb-4 text-[#291285] font-medium font-dash_heading ">
              {findAssignment?.title}
            </h2>
          ) : (
            <div className="min-h-10 flex justify-center items-center">
              <Spin size="medium" />
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto flex justify-center gap-5 pb-20">
          {/* NOTE: Update Lessons */}
          <div className="flex-[60%] w-[60%] mt-10">
            <div className="bg-white border-1 p-5 rounded-lg">
              <h2 className="text-lg text-center pb-4 text-[#ff4854] font-medium font-dash_heading ">
                What have to do? <br />
              </h2>
              {findAssignment ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: findAssignment?.description,
                  }}
                />
              ) : (
                <div className="min-h-40 flex justify-center items-center">
                  <Spin size="medium" />
                </div>
              )}
              {/* NOTE: LIVE CLASS FORM */}
            </div>
          </div>

          {/* NOTE: LESSONS DETAILS */}
          <div className="flex-[40%] w-[40%] mt-10">
            <div className="bg-white border-1 p-5 rounded-lg">
              <h2 className="text-lg text-center pb-4 text-[#37a75e] font-medium font-dash_heading ">
                Submission Guideline
              </h2>
              <div className="rounded-lg">
                <ol className="list-decimal list-inside space-y-4">
                  {/* Deadline */}
                  <li className="text-gray-600 text-sm">
                    You are required to submit the assignment within{' '}
                    <strong className="text-primary font-semibold">
                      7 days
                    </strong>{' '}
                    from the date it is assigned.
                  </li>

                  {/* Submission Method */}
                  <li className="text-gray-600 text-sm">
                    All assignment files and links should be uploaded to{' '}
                    <strong className="text-primary font-semibold">
                      Google Drive
                    </strong>{' '}
                    first. Once uploaded, paste the Google Drive link into the{' '}
                    <strong className="text-primary font-semibold">
                      Assignment Panel
                    </strong>{' '}
                    directly for submission.
                  </li>

                  {/* File Organization */}
                  <li className="text-gray-600 text-sm">
                    <span className="font-semibold">File Organization</span>:
                    <ul className="list-disc list-inside mt-2 ml-4">
                      <li>
                        Create a main folder in Google Drive named{' '}
                        <strong className="text-primary font-semibold">
                          &quot;{findAssignment?.title}&quot;
                        </strong>
                        .
                      </li>
                      <li>
                        For each task, create a separate subfolder inside the
                        main folder.
                      </li>
                      <li>
                        In each subfolder, upload the corresponding files
                        related to that task.
                      </li>
                    </ul>
                  </li>

                  <li className="text-sm">
                    You can submit your assignment{' '}
                    <strong className="text-primary font-semibold">
                      once at a time
                    </strong>
                  </li>
                  {/* Penalty for Missing Deadline */}
                  <li className="text-sm">
                    <strong className="font-semibold">Note:</strong> Missing the
                    submission deadline will result in a{' '}
                    <strong className="text-primary font-semibold">
                      50% deduction
                    </strong>{' '}
                    from your total marks for the assignment.
                  </li>
                </ol>
              </div>
            </div>
            <div className="bg-white border-1 p-5 rounded-lg mt-5">
              <h2 className="text-lg text-center pb-4 text-[#5e5eff] font-medium font-dash_heading ">
                Submission Box
              </h2>
              <InputBox
                title="Write your URL here"
                placeholder="https://drive.google.com/file/d/13d1OetiXoesHC_"
                type="text"
                value={assignmentLink}
                func={(id, value) => setAssignmentLink(value)}
              />

              <ButtonDashboard
                onClick={handleSubmitAssignment}
                // disabled={loading || hasSubmitted} // Disable while loading or if already submitted
                className="mt-5 w-full bg-primary_btn hover:bg-[#002346bc] text-white"
              >
                {loading ? <Spin size="small" /> : 'Submit Assignment'}
              </ButtonDashboard>
            </div>
            <div className="bg-white border-1 p-5 rounded-lg mt-5">
              <h2 className="text-lg text-center pb-4 text-[#ff3333] font-medium font-dash_heading ">
                Your Content
              </h2>
              {findUserAssignment ? (
                <Link
                  href={findUserAssignment?.assignmentLink || '/'}
                  target="_blank"
                  className="break-all cursor-pointer text-blue-500 visited:text-blue-500"
                >
                  {findUserAssignment?.assignmentLink}
                </Link>
              ) : (
                <div className="bg-white min-h-20 flex justify-center items-center">
                  <Spin size="small" />
                </div>
              )}
            </div>
          </div>

          {/* NOTE: LESSON DETAILS END */}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsStudent;
