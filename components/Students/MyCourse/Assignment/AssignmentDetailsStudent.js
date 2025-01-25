import { DownloadOutlined, FileOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import firebase from '../../../../firebase';
import { useStateContext } from '../../../../src/context/ContextProvider';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';
import AssignmentSubmission from './AssignmentSubmission';

const db = firebase.firestore();

const AssignmentDetailsStudent = () => {
  const { findCurrentUser } = useStateContext();
  const { enrolledCourse } = useEnrolledCourseData();
  const [assignmentLinks, setAssignmentLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  const assignmentDownloadLinks = assignmentLinks.map((item) => ({
    downloadURL: item.downloadURL,
    fileName: item.file.name,
  }));

  console.log(assignmentDownloadLinks);

  const { assignmentId } = router.query;

  const findAssignment = enrolledCourse?.assignment_data?.find(
    (item) => item.id === assignmentId,
  );

  const findUserAssignment = findAssignment?.submitted_students?.find(
    (user) => user.student_id === findCurrentUser?.student_id,
  );

  const handleSubmitAssignment = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>You need to agree before submitting this assignment.</p>
        <input type="checkbox" id="agreeCheckbox" />
        <label for="agreeCheckbox">I agree to the terms and conditions.</label>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const checkbox = document.getElementById('agreeCheckbox');
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true;

        checkbox.addEventListener('change', function () {
          confirmButton.disabled = !checkbox.checked;
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (assignmentLinks.length > 0) {
          // Check if already submitted
          const hasAlreadySubmitted = findUserAssignment !== undefined;

          if (hasAlreadySubmitted) {
            return Swal.fire({
              title: 'Duplicate Submission',
              text: 'You have already submitted your assignment.',
              icon: 'warning',
              confirmButtonText: 'OK',
            });
          }

          setLoading(true);

          // Reconstruct courseData dynamically
          const updatedCourseData = {
            ...enrolledCourse,
            assignment_data: (enrolledCourse?.assignment_data || []).map(
              (assignment) =>
                assignment.id === assignmentId
                  ? {
                      ...assignment,
                      submitted_students: [
                        ...(assignment.submitted_students || []).filter(
                          (student) =>
                            student.student_id !== findCurrentUser?.student_id,
                        ),
                        {
                          student_id: findCurrentUser?.student_id,
                          submittedAt: new Date().toISOString(),
                          assignmentLinks: assignmentDownloadLinks,
                          full_name:
                            findCurrentUser?.full_name ||
                            findCurrentUser?.phone,
                        },
                      ],
                    }
                  : assignment,
            ),
          };

          db.collection('course_data_batch')
            .doc(enrolledCourse?.id)
            .update(updatedCourseData)
            .then(() => {
              Swal.fire({
                title: 'Submission Successful',
                text: 'Assignment submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => {
                window.location.reload();
              });
              setHasSubmitted(true);
              setAssignmentLinks([]);
            })
            .catch((error) => {
              console.error('Submission error:', error);
              Swal.fire({
                title: 'Submission Failed',
                text: 'Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          Swal.fire({
            title: 'No Assignment Link',
            text: 'Please upload files before submitting.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  const handleFileDownload = (downloadURL) => {
    window.open(downloadURL, '_blank');
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
              <AssignmentSubmission
                assignmentLinks={assignmentLinks}
                setAssignmentLinks={setAssignmentLinks}
              />

              <ButtonDashboard
                onClick={handleSubmitAssignment}
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
                <div>
                  {findUserAssignment?.assignmentLinks.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mt-2"
                    >
                      <div className="flex items-center">
                        <FileOutlined className="mr-2" />
                        <span>{item.fileName}</span>
                      </div>
                      <DownloadOutlined
                        onClick={() => handleFileDownload(item?.downloadURL)}
                        className="text-primary_btn cursor-pointer text-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white min-h-20 flex justify-center items-center">
                  <Spin size="small" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsStudent;
