// import { useEffect, useState } from 'react';
// import 'sweetalert2/dist/sweetalert2.css';

// import { loadData } from '../../../../src/hooks/loadData';
// import HeadingDashboard from '../../../utilities/dashboard/HeadingDashboard';
// import LeadsForSells from '../LeadsForSells';
// import DueSheet from './DueSheet';
// import ReportDataCourse from './ReportDataCourse';
// import ReportDataPerson from './ReportDataPerson';

// const AllReport = () => {

//   return (
//     <div>
//       <HeadingDashboard title="All Reports" />
//       <div className="max-w-6xl mx-auto my-20 font-dash_heading">
//         <LeadsForSells leads={leads} setLeads={setLeads} />

//         <ReportDataPerson sells={sells} />
//         <ReportDataCourse sells={sells} />
//         <DueSheet sells={sells} />
//       </div>
//     </div>
//   );
// };

// export default AllReport;

import {
  BookOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Progress, Row, Statistic, Tooltip } from 'antd';
import { SquareStack } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../../src/data/data';
import { loadData } from '../../../../src/hooks/loadData';
import DataFilterComponent from '../../../utilities/FilteredButton';

const SummaryReports = () => {
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalDue: 0,
    courseWiseSummary: {},
    salesPersonSummary: {},
    statusSummary: {
      pending: 0,
      enrolled: 0,
      cancelled: 0,
    },
    dueStatusSummary: {
      Pending: 0,
      Completed: 0,
    },
    leadsSummary: {
      total: 0,
      pending: 0,
    },
  });
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataLeads, setFilteredDataLeads] = useState([]);

  const [leads, setLeads] = useState([]);
  const [sells, setSells] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
    loadData('sells_data', setSells);
  }, []);

  const enrolledSells = filteredData.filter(
    (item) => item.status == 'enrolled',
  );

  useEffect(() => {
    if (filteredData?.length > 0) {
      const newSummary = {
        totalSales: enrolledSells.length,
        totalRevenue: 0,
        totalDue: 0,
        courseWiseSummary: {},
        salesPersonSummary: {},
        statusSummary: {
          pending: 0,
          enrolled: 0,
          cancelled: 0,
        },
        dueStatusSummary: {
          Pending: 0,
          Completed: 0,
        },
      };

      filteredData.forEach((sale) => {
        const salesPerson = sale.sells_processed?.name || 'Unknown';
        if (!newSummary.salesPersonSummary[salesPerson]) {
          newSummary.salesPersonSummary[salesPerson] = {
            count: 0,
            revenue: 0,
            leads_handle: 0,
          };
        }
        newSummary.salesPersonSummary[salesPerson].leads_handle++;
      });

      enrolledSells.forEach((sale) => {
        // Calculate revenue and due
        newSummary.totalRevenue += Number(sale.paid_amount) || 0;
        newSummary.totalDue += Number(sale.due_amount) || 0;

        // Course-wise summary
        if (sale.course_name) {
          if (!newSummary.courseWiseSummary[sale.course_name]) {
            newSummary.courseWiseSummary[sale.course_name] = {
              count: 0,
              revenue: 0,
              due: 0,
            };
          }
          newSummary.courseWiseSummary[sale.course_name].count++;
          newSummary.courseWiseSummary[sale.course_name].revenue +=
            Number(sale.paid_amount) || 0;
          newSummary.courseWiseSummary[sale.course_name].due +=
            Number(sale.due_amount) || 0;
        }

        // Sales person summary
        const salesPerson = sale.sells_processed?.name || 'Unknown';
        if (!newSummary.salesPersonSummary[salesPerson]) {
          newSummary.salesPersonSummary[salesPerson] = {
            count: 0,
            revenue: 0,
          };
        }
        newSummary.salesPersonSummary[salesPerson].count++;
        newSummary.salesPersonSummary[salesPerson].revenue +=
          Number(sale.paid_amount) || 0;

        // Status summary
        if (sale.status) {
          newSummary.statusSummary[sale.status]++;
        }

        // Due status summary
        if (sale.due_status) {
          newSummary.dueStatusSummary[sale.due_status]++;
        }
      });

      // Leads summary
      if (leads?.length > 0) {
        newSummary.leadsSummary = {
          total: leads.length,
          pending: leads.filter((lead) => lead.status === 'pending').length,
        };
      }

      setSummary(newSummary);
    }
  }, [enrolledSells, filteredData, leads]);

  const totalSales = Object.values(summary.salesPersonSummary).reduce(
    (acc, curr) => acc + curr.count,
    0,
  );
  const totalLeads = Object.values(summary.salesPersonSummary).reduce(
    (acc, curr) => acc + curr.leads_handle,
    0,
  );
  const totalRevenue = Object.values(summary.salesPersonSummary).reduce(
    (acc, curr) => acc + curr.revenue,
    0,
  );

  const groupBy = (data, key, options = {}) => {
    const {
      // Allow nested property access using dot notation
      accessor = (item) => {
        const keys = key.split('.');
        return keys.reduce((obj, k) => obj?.[k], item);
      },
      // Allow customizing the group object structure
      createGroup = (groupKey, items) => ({
        [key]: groupKey,
        data: items,
      }),
    } = options;

    const grouped = {};

    data.forEach((item) => {
      const groupKey = accessor(item);

      if (!grouped[groupKey]) {
        grouped[groupKey] = { [key]: groupKey, data: [] };
      }

      grouped[groupKey].data.push(item);
    });

    return Object.values(grouped);
  };

  // Usage:
  const allSellsData = groupBy(filteredData, 'status');
  const allLeadsData = groupBy(filteredDataLeads, 'course_name');
  const allMembersData = groupBy(filteredDataLeads, 'lead_processed.name');

  console.log(allMembersData);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <DataFilterComponent
        setFilteredData={setFilteredData}
        data={sells}
        setSecondState={setFilteredDataLeads}
        data2={leads}
      />
      {/* Overview Statistics */}
      <Row gutter={[16, 16]} className="mt-16">
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Total Sales"
              value={summary.totalSales}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Total Revenue"
              value={summary.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Total Due"
              value={summary.totalDue}
              prefix={<ClockCircleOutlined />}
              precision={2}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Total Leads"
              value={filteredDataLeads?.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Course Summary */}
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <BookOutlined className="text-primary" />
                <span className="text-lg font-medium">Course-wise Summary</span>
              </div>
            }
            bordered={false}
            className="shadow-sm"
          >
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-gray-50 rounded-t-lg font-medium text-gray-600">
              <div className="col-span-1">Course Name</div>
              <div className="col-span-1 text-center">Total Sales</div>
              <div className="col-span-1 text-center">Revenue</div>
              <div className="col-span-1 text-center">Due Amount</div>
              <div className="col-span-1 text-center">Collection Rate</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {Object.entries(summary.courseWiseSummary).map(
                ([course, data]) => {
                  const collectionRate =
                    (data.revenue / (data.revenue + data.due)) * 100;

                  return (
                    <div
                      key={course}
                      className="grid grid-cols-5 gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Course Name */}
                      <div className="col-span-1">
                        <Tooltip title={course}>
                          <div className="font-medium text-blue-600 truncate">
                            {course}
                          </div>
                        </Tooltip>
                      </div>

                      {/* Sales Count */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold">
                            {data.count}
                          </div>
                          <div className="text-xs text-gray-500">Students</div>
                        </div>
                      </div>

                      {/* Revenue */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold text-green-600">
                            ${data.revenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Collected</div>
                        </div>
                      </div>

                      {/* Due Amount */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold text-orange-500">
                            ${data.due.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Pending</div>
                        </div>
                      </div>

                      {/* Collection Rate */}
                      <div className="col-span-1">
                        <div className="flex justify-center">
                          <Progress
                            type="dashboard"
                            percent={Math.round(collectionRate)}
                            width={80}
                            strokeColor={{
                              '0%': '#ff4d4f',
                              '50%': '#faad14',
                              '100%': '#52c41a',
                            }}
                            format={(percent) => (
                              <div className="text-xs">
                                <div className="font-semibold">{percent}%</div>
                                <div className="text-gray-500">Collected</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* Summary Footer */}
            <div className="mt-4 pt-4 border-t">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Total Courses"
                    value={Object.keys(summary.courseWiseSummary).length}
                    prefix={<BookOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Total Revenue"
                    value={Object.values(summary.courseWiseSummary).reduce(
                      (acc, curr) => acc + curr.revenue,
                      0,
                    )}
                    prefix="$"
                    precision={2}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Total Due"
                    value={Object.values(summary.courseWiseSummary).reduce(
                      (acc, curr) => acc + curr.due,
                      0,
                    )}
                    prefix="$"
                    precision={2}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Sales Person Summary */}
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-primary" />
                <span className="text-lg font-medium">
                  Sales Person Summary
                </span>
              </div>
            }
            bordered={false}
            className="shadow-sm"
          >
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-gray-50 rounded-t-lg font-medium text-gray-600">
              <div className="col-span-1">Sales Person</div>
              <div className="col-span-1 text-center">Total Lead Handle</div>
              <div className="col-span-1 text-center">Total Sales</div>
              <div className="col-span-1 text-center">Revenue</div>
              <div className="col-span-1 text-center">Performance</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {Object.entries(summary.salesPersonSummary).map(
                ([person, data]) => {
                  // Calculate performance percentage based on contribution to total revenue
                  const performancePercent =
                    (data.count / data.leads_handle) * 100;

                  return (
                    <div
                      key={person}
                      className="grid grid-cols-5 gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Sales Person Name */}
                      <div className="col-span-1">
                        <Tooltip title={`Sales Person: ${person}`}>
                          <div className="flex items-center gap-2">
                            <UserOutlined className="text-blue-500" />
                            <div className="font-medium text-blue-600 truncate">
                              {person}
                            </div>
                          </div>
                        </Tooltip>
                      </div>

                      {/* Sales Count */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold">
                            {data.leads_handle}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total Sales
                          </div>
                        </div>
                      </div>

                      {/* Sales Count */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold">
                            {data.count}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total Sales
                          </div>
                        </div>
                      </div>

                      {/* Revenue */}
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-semibold text-green-600">
                            ${data.revenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Revenue Generated
                          </div>
                        </div>
                      </div>

                      {/* Performance Meter */}
                      <div className="col-span-1">
                        <div className="flex justify-center">
                          <Progress
                            type="dashboard"
                            percent={Math.round(performancePercent)}
                            width={80}
                            strokeColor={{
                              '0%': '#ff4d4f',
                              '50%': '#faad14',
                              '100%': '#52c41a',
                            }}
                            format={(percent) => (
                              <div className="text-xs">
                                <div className="font-semibold">{percent}%</div>
                                <div className="text-gray-500">of Lead</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* Summary Footer */}
            <div className="mt-4 pt-4 border-t">
              <Row gutter={16}>
                <Col span={5}>
                  <Statistic
                    title="Total Sales People"
                    value={Object.keys(summary.salesPersonSummary).length}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Total Lead Handle"
                    value={totalLeads}
                    prefix={<UserOutlined />}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Total Sales"
                    value={totalSales}
                    prefix={<ShoppingOutlined />}
                  />
                </Col>
                <Col span={5}>
                  <Statistic
                    title="Total Revenue"
                    value={totalRevenue}
                    prefix={<DollarOutlined />}
                    precision={2}
                    // prefix="$"
                  />
                </Col>
                <Col span={4}>
                  <Progress
                    type="dashboard"
                    percent={Math.round((totalSales / totalLeads) * 100)}
                    width={70}
                    strokeColor={{
                      '0%': '#ff4d4f',
                      '50%': '#faad14',
                      '100%': '#52c41a',
                    }}
                    format={(percent) => (
                      <div className="text-xs">
                        <div className="font-semibold">{percent}%</div>
                        <div className="text-gray-500">of Lead</div>
                      </div>
                    )}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-8 justify-center">
        <Col xs={24} md={16}>
          <Card
            title="Sells Status"
            bordered={false}
            className="shadow-sm hover:shadow-md transition-shadow border-1"
          >
            <div className="space-y-4">
              {allSellsData?.map((item, index) => (
                <div
                  key={item?.status}
                  className={`text-[${colors[index]}] font-semibold capitalize flex justify-between items-center`}
                >
                  <span>{item?.status}</span>
                  <span>{item?.data.length}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      {/* Status Summaries */}
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24} md={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <SquareStack className="text-primary" />
                <span className="text-lg font-medium">Lead Course Summary</span>
              </div>
            }
            bordered={false}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {allLeadsData?.map((item, index) => (
                <div
                  key={item?.status}
                  className={`text-[${colors[index]}] font-semibold capitalize flex justify-between items-center`}
                >
                  <span>{item?.course_name}</span>
                  <span>{item?.data.length}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-primary" />
                <span className="text-lg font-medium">
                  Lead Members Summary
                </span>
              </div>
            }
            bordered={false}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {allMembersData?.map((item, index) => (
                <div
                  key={item?.name}
                  className={`text-[${
                    colors[index * 2]
                  }] font-semibold capitalize flex justify-between items-center`}
                >
                  <span>{item?.['lead_processed.name']}</span>
                  <span>{item?.data.length}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryReports;
