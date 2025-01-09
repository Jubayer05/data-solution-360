import { Button, Form, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { firestore } from '../../../firebase';

const ROLES = {
  TEACHER: 'teacher',
  ADMIN: 'admin',
  CONTENT_MANAGER: 'content_manager',
  LEAD_MEMBER: 'lead_member',
  SALES_MEMBER: 'sales_member',
  SUPER_ADMIN: 'super_admin',
};

export default function PreRegisterStaffForm() {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Fetch data from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore.collection('users').get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaffData(data.filter((item) => item.role !== 'student'));
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch data.', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await firestore.collection('users').doc(id).delete();
        Swal.fire('Deleted!', 'Staff has been deleted.', 'success');
        fetchData();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete staff.', 'error');
      }
    }
  };

  // Handle registration
  const handleRegister = async ({ email, role, full_name }) => {
    if (staffData.some((staff) => staff.email === email)) {
      Swal.fire('Warning', 'This email is already registered.', 'warning');
      return;
    }

    setLoading(true);
    try {
      await firestore.collection('users').add({
        email,
        role,
        full_name,
      });
      Swal.fire('Success', 'Staff registered successfully.', 'success');
      fetchData();
    } catch (error) {
      Swal.fire('Error', 'Failed to register staff.', 'error');
    }
    setLoading(false);
  };

  // Handle edit
  const handleEdit = async (id, newRole) => {
    try {
      await firestore.collection('users').doc(id).update({
        role: newRole,
      });
      Swal.fire('Success', 'Role updated successfully.', 'success');
      fetchData();
      setIsEditModalVisible(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to update role.', 'error');
    }
  };

  // Columns for Ant Design Table
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setEditRecord(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Staff Management</h2>

      <RegisterStaffForm onRegister={handleRegister} loading={loading} />

      {/* Staff Table */}
      <Table
        dataSource={staffData}
        columns={columns}
        rowKey="id"
        loading={loading}
        className="mt-6 bg-white rounded-lg shadow-md border-1"
      />

      {/* Edit Role Modal */}
      {isEditModalVisible && (
        <Modal
          title="Edit Role"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={() => handleEdit(editRecord.id, editRecord.role)}
        >
          <Form layout="vertical">
            <Form.Item label="Role">
              <Select
                value={{
                  label: (
                    <p className="capitalize">
                      {editRecord.role.replace('_', ' ')}
                    </p>
                  ),
                  value: editRecord.role,
                }}
                onChange={(option) =>
                  setEditRecord((prev) => ({ ...prev, role: option.value }))
                }
                options={Object.values(ROLES)
                  .filter((role) => role !== ROLES.SUPER_ADMIN)
                  .map((role) => ({
                    label: (
                      <p className="capitalize">{role.replace('_', ' ')}</p>
                    ),
                    value: role,
                  }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

function RegisterStaffForm({ onRegister, loading }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !role) {
      Swal.fire('Warning', 'Please fill all fields.', 'warning');
      return;
    }
    onRegister({ email, role: role.value, full_name: name });
    setEmail('');
    setName('');
    setRole(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-2.5 text-base outline-none border-1 mt-1.5 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <Select
          value={role}
          onChange={setRole}
          placeholder="Select a role"
          options={Object.values(ROLES)
            .filter((role) => role !== ROLES.SUPER_ADMIN)
            .map((role) => ({
              label: <p className="capitalize">{role.replace('_', ' ')}</p>,
              value: role,
            }))}
          className="focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition $${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        Register Staff
      </button>
    </form>
  );
}
