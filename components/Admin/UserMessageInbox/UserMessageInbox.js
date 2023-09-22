import { Table } from 'antd';
import { useEffect, useState } from 'react';

import firebase from '../../../firebase';
import HeadingDashboard from '../../utilities/HeadingDashboard';
const db = firebase.firestore();

const UserMessageInbox = () => {
  const [userData, setUserData] = useState([]);

  const columns = [
    {
      title: 'SL Number',
      dataIndex: 'serialNumber',
      width: 150,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      align: 'center',
      width: 350,
    },
  ];

  useEffect(() => {
    db.collection('subscripted_user').onSnapshot((snap) => {
      const userData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userData);
    });
  }, []);

  return (
    <div>
      <HeadingDashboard title="Subscribed user for newsletter" />
      <div className="max-w-3xl mx-auto">
        <Table
          columns={columns}
          dataSource={[...userData]}
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

export default UserMessageInbox;
