import { ConfigProvider, Progress, Table } from 'antd';
import React, { useEffect, useState } from 'react';
// import { videosPlaylist } from '../../../../src/data/data';
import Image from 'next/image';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { useStateContext } from '../../../src/context/ContextProvider';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../src/hooks/useEnrolledCourseData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const ReportDetails = () => {
  const { activeMenu, showedItem, setShowedItem } = useStateContextDashboard();
  const [currentUrl, setCurrentUrl] = useState(null);
  const { findCurrentUser } = useStateContext();
  const { enrolledCourse } = useEnrolledCourseData();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const columns = [
    {
      title: 'Module Name',
      dataIndex: '',
      width: '42%',
      align: 'left',
      render: (_, record) => (
        <div>
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-bold">Module-{record?.moduleNumber}</h2>
            <ButtonDashboard className="text-sm pl-2 pr-2 pt-[6px] pb-[6px]">
              <span>Visit Module</span>
              <MdOutlineArrowOutward className="text-lg" />{' '}
            </ButtonDashboard>
          </div>
          <p className="mt-1.5 text-base font-medium text-slate-500">
            {record.moduleName}
          </p>
        </div>
      ),
    },

    {
      title: 'Progress',
      dataIndex: 'class_date',
      width: '42%',
      align: 'center',
      render: (_, record) => {
        // Calculate the total possible marks
        const totalMarks = record?.additionalInfo?.totalQuizNum;

        // Calculate the user's obtained marks
        const obtainedMarks = record.lessons?.reduce((acc, lesson) => {
          const userQuizData = lesson?.user_quizData?.find(
            (stu) => stu.student_id === findCurrentUser?.student_id,
          );
          return acc + (userQuizData?.obtained_marks || 0);
        }, 0);

        // Calculate the percentage
        const percent = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

        return (
          <div>
            <div className="flex items-center gap-2">
              <Progress
                percent={Math.ceil(percent)} // Round the percentage to nearest integer
                size="small"
                status="active"
                trailColor="#d0d5dd"
                strokeColor="#12b76a"
                className="flex-1 font-bold text-base text-[#12b76a]"
              />
              <p className="rounded text-base font-bold mt-1">
                (Module Progress)
              </p>
            </div>
          </div>
        );
      },
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <div>
      {/* NOTE: MODULE SEGMENT */}
      <div className="min-h-screen my-10 border">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#02274b',
                headerColor: '#ffffff',
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={[...(enrolledCourse?.course_modules || [])]}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => {
                // Step 1: Calculate total quiz marks
                const totalQuizMarks =
                  record?.additionalInfo?.totalQuizNum || 0;
                const totalLiveClassNum =
                  record?.additionalInfo?.totalLiveClass;

                console.log(totalQuizMarks);

                // Step 2: Calculate user's obtained quiz marks
                const userQuizMarks = record.lessons?.reduce((sum, lesson) => {
                  const userQuizData = lesson?.user_quizData?.find(
                    (stu) => stu.student_id === findCurrentUser?.student_id,
                  );
                  return sum + (userQuizData?.obtained_marks || 0); // Assuming obtained_marks is the user's score for each lesson
                }, 0);

                // Step 3: Calculate the quiz percentage
                const quizPercentage =
                  totalQuizMarks > 0
                    ? (userQuizMarks / totalQuizMarks) * 100
                    : 0;
                return (
                  <div className="border border-gray-300 flex px-10 py-5 rounded-lg gap-10 bg-white">
                    <div className="flex-1 ">
                      <div className="flex gap-10">
                        <div className="w-[35%]">
                          <p>Name</p>
                          <div className="bg-gray-200 w-full h-[1px] mt-1" />
                        </div>
                        <div className="w-[65%]">
                          <p>Mark</p>
                          <div className="bg-gray-200 w-full h-[1px] mt-1" />
                        </div>
                      </div>
                      <div className="border border-x-0 border-gray-200 mt-3 py-3">
                        <div className="flex gap-10">
                          <div className="w-[35%] flex items-center gap-2">
                            <Image
                              width={500}
                              height={300}
                              src="/icon/profile.png"
                              className="w-[26px]"
                              alt=""
                            />
                            <p className="font-medium">Attendance</p>
                          </div>
                          <div className="w-[65%]">
                            <div className="flex items-center gap-2">
                              <Progress
                                percent={Math.ceil(quizPercentage)}
                                size={['100%', 6]}
                                status="active"
                                trailColor="#d0d5dd"
                                strokeColor="#12b76a"
                                className="flex-1 font-bold text-base text-[#12b76a]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-10">
                        <div className="w-[35%]">
                          <p>Name</p>
                          <div className="bg-gray-200 w-full h-[1px] mt-1" />
                        </div>
                        <div className="w-[65%]">
                          <p>Mark</p>
                          <div className="bg-gray-200 w-full h-[1px] mt-1" />
                        </div>
                      </div>
                      <div className="border border-x-0 border-gray-200 mt-3 py-3">
                        <div className="flex gap-10">
                          <div className="w-[35%] flex items-center gap-2">
                            <Image
                              width={500}
                              height={300}
                              src="/icon/quiz.png"
                              className="w-[26px]"
                              alt=""
                            />
                            <p className="font-medium">Quiz</p>
                          </div>
                          <div className="w-[65%]">
                            <div className="flex items-center gap-2">
                              <Progress
                                percent={Math.ceil(quizPercentage)}
                                size={['100%', 6]}
                                status="active"
                                trailColor="#d0d5dd"
                                strokeColor="#12b76a"
                                className="flex-1 font-bold text-base text-[#12b76a]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => onExpand(record, e)}
                      className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center gap-1 
          px-3 py-2 font-medium rounded-full w-[40px] h-[40px] z-50"
                    >
                      <FaAngleUp className="text-lg" />{' '}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => onExpand(record, e)}
                      className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center gap-1 
                    px-3 py-2 font-medium rounded-full w-[40px] h-[40px] z-50"
                    >
                      <FaAngleDown className="text-lg" />{' '}
                    </button>
                  </div>
                ),
            }}
            className="w-full"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ReportDetails;
