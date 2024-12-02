import 'sweetalert2/dist/sweetalert2.css';

import { Table } from 'antd';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import useFetchDocById from '../../../src/hooks/manageDataById/useLoadDocumentById';
import useUpdateDocumentById from '../../../src/hooks/manageDataById/useUpdateDocumentById';
import { formatFirestoreTimestamp } from '../../../src/utils/convertDate';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
// import EnrolledStudent from './BatchDetails/EnrolledStudents';

const FromDetails = () => {
  const router = useRouter();
  const { formId } = router.query;

  const { data, loading, error } = useFetchDocById('form_data', formId);
  const { updateDocument, loadingUpdate, errorUpdate, success } =
    useUpdateDocumentById('form_data', formId);

  const columns = [
    {
      title: 'SL',
      dataIndex: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      width: 150,
      align: 'center',
    },
    {
      title: 'Whatsapp Number',
      dataIndex: 'whatsapp_number',
      align: 'center',
      width: 180,
    },

    {
      title: 'Registration Time',
      align: 'center',
      width: 180,
      render: (item) => <p>{formatFirestoreTimestamp(item?.createdAt)}</p>,
    },

    {
      title: 'Already Called?',
      align: 'center',
      width: 180,
      render: (item) => (
        <p>
          {item?.alreadyCalled ? (
            <span className="bg-green-100 border border-green-500 px-2 text-xs rounded-full font-semibold text-[#109a30]">
              Called
            </span>
          ) : (
            <span className="bg-red-100 border border-red-500 px-2 text-xs rounded-full font-semibold text-[#d41013]">
              Pending
            </span>
          )}
        </p>
      ),
    },

    {
      title: 'Action',
      width: 150,
      align: 'center',
      render: (_, record, index) => (
        <div className="flex items-center justify-center gap-5">
          <ButtonDashboard
            onClick={() => handleCallUser(record)}
            className="bg-[#4592ff] hover:bg-[#4592ff] hover:opacity-80 text-white"
          >
            Call Done
          </ButtonDashboard>
        </div>
      ),
    },
  ];

  const handleCallUser = (record) => {
    const updatedData = { ...data };

    const index = updatedData.subscribed_students.findIndex(
      (student) => student.id === record.id,
    );

    updatedData.subscribed_students[index].alreadyCalled = true;

    updateDocument(updatedData);

    Swal.fire({
      title: 'Success!',
      text: 'User called successfully!',
      icon: 'success',
      confirmButtonText: 'Okay',
    });
  };

  return (
    <div>
      <HeadingDashboard title="From Details" />
      <div className="max-w-5xl mx-auto my-20">
        <div className="max-w-5xl mx-auto border-1 bg-white p-5">
          <Table
            columns={columns}
            dataSource={[...(data?.subscribed_students || [])]}
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              x: 'max-content',
              y: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FromDetails;
