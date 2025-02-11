import { Card, Modal, Progress, message } from 'antd';
import { useFormik } from 'formik';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase';

const SupportCompanies = () => {
  const [technologyStack, setTechnologyStack] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection('utility_collection')
          .doc('companies_data')
          .get();

        if (doc.exists) {
          const data = doc.data();
          setTechnologyStack(data.companies || []);
        }
      } catch (error) {
        message.error('Failed to load companies');
      }
    };

    fetchCompanies();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 1024000) {
      message.error('File size must be under 1MB');
      return;
    }

    const storageRef = firebase.storage().ref(`investorCompanies/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setUploadProgress(progress);
      },
      (error) => {
        message.error('Upload failed');
      },
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        setImageUrl(downloadURL);
      },
    );
  };

  const formik = useFormik({
    initialValues: {
      titleIcon: '',
      img: '',
    },
    onSubmit: async (values) => {
      try {
        const newCompany = {
          id: Date.now().toString(),
          titleIcon: values.titleIcon,
          img: imageUrl,
        };

        await firebase
          .firestore()
          .collection('utility_collection')
          .doc('companies_data')
          .set({
            companies: [...technologyStack, newCompany],
          });

        setTechnologyStack((prev) => [...prev, newCompany]);
        message.success('Company added successfully');
        formik.resetForm();
        setImageUrl('');
        setUploadProgress(0);
        setIsModalVisible(false);
      } catch (error) {
        message.error('Failed to add company');
      }
    },
  });

  const handleRemoveTechnology = async (id) => {
    try {
      const updatedCompanies = technologyStack.filter((tech) => tech.id !== id);

      await firebase
        .firestore()
        .collection('utility_collection')
        .doc('companies_data')
        .set({
          companies: updatedCompanies,
        });

      setTechnologyStack(updatedCompanies);
      message.success('Company removed successfully');
    } catch (error) {
      message.error('Failed to remove company');
    }
  };

  return (
    <div className="max-w-3xl mx-auto shadow mb-20" id="support_companies">
      <Card
        title={
          <div className="flex items-center">
            <Plus className="mr-2" />
            Investor Companies
          </div>
        }
        extra={
          <button
            onClick={() => setIsModalVisible(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Company
          </button>
        }
      >
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {technologyStack.map((tech) => (
            <div key={tech.id} className="relative group">
              <div className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition-all">
                <Image
                  src={tech.img}
                  alt={tech.titleIcon}
                  width={80}
                  height={80}
                  className="mx-auto mb-2"
                />
                <p className="text-sm truncate">{tech.titleIcon}</p>
                <button
                  onClick={() => handleRemoveTechnology(tech.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        title="Add New Company"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Company Logo</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border rounded"
            />
            {uploadProgress > 0 && (
              <Progress
                percent={uploadProgress}
                size="small"
                className="mt-2"
              />
            )}
          </div>

          <div>
            <label className="block mb-2">Company Name</label>
            <input
              name="titleIcon"
              value={formik.values.titleIcon}
              onChange={formik.handleChange}
              placeholder="Enter company name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={!imageUrl || !formik.values.titleIcon}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            Add Company
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SupportCompanies;
