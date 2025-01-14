import {
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Space, Tag, Typography } from 'antd';
import React from 'react';
import { convertToAMPM } from '../../../src/utils/convertAMPM';
import { formatDateWithoutYear, isToday } from '../../../src/utils/convertDate';

const { Title, Text } = Typography;

const TodayClassRight = ({ item }) => {
  const currentModule = item?.course_modules.find(
    (item) => item.moduleStatus === 'running',
  );

  const currentLesson = currentModule?.lessons.find((lessonItem) =>
    isToday(lessonItem.classDate),
  );

  const titleText = currentLesson
    ? "You're Ready for Today's Class!"
    : 'No Class Scheduled Today';

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Title level={4} style={{ marginBottom: 8 }}>
            {titleText}
          </Title>
          <Text type="secondary">
            <CalendarOutlined style={{ marginRight: 8 }} />
            {formatDateWithoutYear(currentLesson?.classDate || new Date())}
          </Text>
        </div>

        <Tag
          color="blue"
          style={{
            whiteSpace: 'normal', // Allows text wrapping
            wordWrap: 'break-word', // Breaks long words if necessary
            maxWidth: '100%', // Ensures it doesn't exceed the container width
            display: 'inline-block', // Ensures proper block-level behavior
          }}
        >
          {item?.courseData?.item_name}
        </Tag>
        <Tag color="green">Batch-{item?.batchNumber}</Tag>

        {currentLesson ? (
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
                  <Text type="secondary">
                    <UserOutlined style={{ marginRight: 8 }} />
                    Instructor
                  </Text>
                  <div>
                    <Text strong>
                      {currentLesson?.instructorForClass?.profileName}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text type="secondary">
                    <BookOutlined style={{ marginRight: 8 }} />
                    Topic
                  </Text>
                  <div>
                    <Text strong>{currentLesson?.title}</Text>
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

export default TodayClassRight;
