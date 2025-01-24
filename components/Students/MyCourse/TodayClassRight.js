import {
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Space, Tag } from 'antd';
import { convertToAMPM } from '../../../src/utils/convertAMPM';
import { formatDateWithoutYear, isToday } from '../../../src/utils/convertDate';

// Parent Component
import React, { useMemo, useState } from 'react';
import CourseBatchModal from './ModalCourseBatch';

const TodayClassContainer = ({ courseDataBatch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // Filter courses that have classes today
  const todayClasses = useMemo(() => {
    return courseDataBatch?.filter((item) => {
      const currentModule = item?.course_modules.find(
        (module) => module.moduleStatus === 'running',
      );
      const hasClassToday = currentModule?.lessons.some((lesson) =>
        isToday(lesson.classDate),
      );
      return hasClassToday;
    });
  }, [courseDataBatch]);

  console.log(courseDataBatch);

  // If no classes today, show single "no class" card
  if (!todayClasses?.length) {
    return (
      <div>
        <CourseBatchModal courseDataBatch={courseDataBatch} />
        <TodayClassRight item={courseDataBatch[0]} forceNoClass={true} />
      </div>
    );
  }

  // Show only courses that have classes today
  return (
    <div>
      <CourseBatchModal courseDataBatch={courseDataBatch} />
      {todayClasses.map((item) => (
        <TodayClassRight key={item.id} item={item} />
      ))}
    </div>
  );
};

// Modified Child Component
const TodayClassRight = ({ item, forceNoClass = false }) => {
  const currentModule = item?.course_modules.find(
    (item) => item.moduleStatus === 'running',
  );

  const currentLesson = currentModule?.lessons.find((lessonItem) =>
    isToday(lessonItem.classDate),
  );

  // If forceNoClass is true, always show the "no class" view
  const shouldShowNoClass = forceNoClass || !currentLesson;
  const titleText = shouldShowNoClass
    ? 'No classes for today.'
    : 'You are all set for today’s class!';

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4 className="font-semibold" style={{ marginBottom: 8 }}>
            {titleText}
          </h4>
          <p type="secondary">
            <CalendarOutlined style={{ marginRight: 8 }} />
            {formatDateWithoutYear(currentLesson?.classDate || new Date())}
          </p>
        </div>

        <Tag
          color="blue"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            maxWidth: '100%',
            display: 'inline-block',
          }}
        >
          {item?.courseData?.item_name}
        </Tag>
        <Tag color="green">Batch-{item?.batchNumber}</Tag>

        {!shouldShowNoClass ? (
          <>
            <Card
              size="small"
              bordered={false}
              style={{ background: '#f5f5f5' }}
            >
              <Space direction="vertical" size="small">
                <Space>
                  <Tag color="purple">Module {currentModule?.moduleNumber}</Tag>
                  <Tag color="green">{currentLesson?.classType}</Tag>
                </Space>

                <div>
                  <p type="secondary">
                    <UserOutlined style={{ marginRight: 8 }} />
                    Instructor
                  </p>
                  <div>
                    <p>{currentLesson?.instructorForClass?.profileName}</p>
                  </div>
                </div>

                <div>
                  <p type="secondary">
                    <BookOutlined style={{ marginRight: 8 }} />
                    Topic
                  </p>
                  <div>
                    <p>{currentLesson?.title}</p>
                  </div>
                </div>
              </Space>
            </Card>

            <Button type="primary" icon={<ClockCircleOutlined />}>
              Class will start {convertToAMPM(currentLesson?.classTime)}
            </Button>
          </>
        ) : (
          <Alert
            message="No Live Class Today"
            icon={<InfoCircleFilled />}
            showIcon
            type="info"
            style={{
              backgroundColor: '#ffece6',
              border: '1px solid #91caff',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '16px',
              textAlign: 'center',
            }}
            banner
          />
        )}
      </Space>
    </Card>
  );
};

export default TodayClassContainer;
