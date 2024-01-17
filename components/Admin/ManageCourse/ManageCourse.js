import { Table } from 'antd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';
import HeadingDashboard from '../../utilities/HeadingDashboard';
const db = firebase.firestore();

const ManageCourse = () => {
  const { courseData } = useStateContext();

  const columns = [
    {
      title: 'SL Number',
      dataIndex: 'serialNumber',
      width: 80,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Blog Title',
      dataIndex: 'title',
      align: 'left',
      width: 350,
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <button
          className="bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => handleDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  const handleDelete = (record) => {
    console.log(record);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('course_data')
          .doc(record.key)
          .delete()
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };
  return (
    <div>
      <HeadingDashboard title="Subscribed user for newsletter" />
      <div className="max-w-3xl mx-auto my-20">
        <Table
          columns={columns}
          dataSource={[...courseData]}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 400,
          }}
        />
      </div>
    </div>
  );
};

export default ManageCourse;
