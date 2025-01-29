import { Table } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';
import { colors } from '../../../../src/data/data';
import { loadData } from '../../../../src/hooks/loadData';
import PieChartCustom from '../../../utilities/Chart/PieChart';
import DataFilterComponent from '../../../utilities/FilteredButton';
import StatusBadge from '../Utils/StatusBadge';

const db = firebase.firestore();

const SellsStatusReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [sells, setSells] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    loadData('sells_data', setSells);
  }, []);

  // Ant Design Table Columns
  const getColumns = (data) => {
    // Define base columns that are always shown
    const baseColumns = [
      {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        key: 'customer_name',
        align: 'center',
        width: 150,
      },
      {
        title: 'Phone Number',
        dataIndex: 'customer_phoneNumber',
        key: 'customer_phoneNumber',
        align: 'center',
        width: 120,
      },
      {
        title: 'Course Name',
        dataIndex: 'course_name',
        key: 'course_name',
        width: 230,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 150,
        render: (record) => (
          <div>
            <StatusBadge status={record} />
          </div>
        ),
      },
      {
        title: 'Lead Processed',
        dataIndex: 'lead_processed',
        key: 'lead_processed',
        width: 100,
        render: (processed) => `${processed?.name || 'N/A'}`,
      },
      {
        title: 'Created At',
        key: 'createdAt',
        align: 'center',
        render: (date) => {
          const time = date?.createdAt
            ? format(new Date(date.createdAt), 'hh:mm a')
            : 'N/A';
          const formattedDate = date?.createdAt
            ? format(new Date(date.createdAt), 'dd MMM yyyy')
            : 'N/A';
          return (
            <div
              style={{ textAlign: 'center', fontWeight: '500', color: '#555' }}
            >
              <div style={{ fontSize: '14px', color: '#555' }}>{time}</div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                {formattedDate}
              </div>
            </div>
          );
        },
        width: 150,
      },
    ];

    // Define follow-up date column
    const followUpDateColumn = {
      title: 'Follow up Date',
      key: 'followup_date',
      align: 'center',
      render: (date) => {
        const formattedDate = date?.followup_date
          ? format(new Date(date.followup_date), 'dd MMM yyyy')
          : 'N/A';
        return (
          <div
            style={{ textAlign: 'center', fontWeight: '500', color: '#555' }}
          >
            <div style={{ fontSize: '14px', color: '#555' }}>
              {formattedDate}
            </div>
          </div>
        );
      },
      width: 150,
    };

    // Check if this group is for follow-up needed status
    const shouldShowFollowUpColumn =
      data.length > 0 && data[0].status === 'follow-up needed';

    // Return columns array with or without follow-up date column
    return shouldShowFollowUpColumn
      ? [
          ...baseColumns.slice(0, 4),
          followUpDateColumn,
          ...baseColumns.slice(4),
        ]
      : baseColumns;
  };

  const groupByCourse = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const { status } = item;

      if (!grouped[status]) {
        grouped[status] = { status, data: [] };
      }

      grouped[status].data.push(item);
    });

    return Object.entries(grouped).map(([status, { data }]) => ({
      status,
      data,
    }));
  };

  const allSellsData = groupByCourse(filteredData);

  const pieChartData = allSellsData.map((item) => ({
    name: `${item.status}`,
    value: item.data.length,
  }));

  return (
    <div>
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="mt-10 p-10 bg-white rounded-md border-1">
          <h2 className="text-xl font-bold mb-4">
            Sells Table by Course ({filteredData?.length})
          </h2>
          <DataFilterComponent setFilteredData={setFilteredData} data={sells} />
          <PieChartCustom
            data={pieChartData}
            colors={['#4caf50', '#2196f3', '#ff5722', '#ffc107']}
          />

          {allSellsData?.map((item, index) => {
            // Get columns specifically for this status group
            const groupColumns = getColumns(item.data);

            return (
              <div key={index} className="mt-10 border-b-1">
                <h2 className="text-xl font-bold mb-4">
                  Sells data by:{' '}
                  <span className={`text-[${colors[index]}]`}>
                    {item?.status} ({item?.data.length})
                  </span>
                </h2>
                <Table
                  dataSource={item?.data}
                  columns={groupColumns}
                  rowKey="id"
                  bordered
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: 1500, y: 400 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SellsStatusReport;
