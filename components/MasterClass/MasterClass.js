import { Radio } from 'antd';
import { serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import useFetchDocById from '../../src/hooks/manageDataById/useLoadDocumentById';
import useUpdateDocumentById from '../../src/hooks/manageDataById/useUpdateDocumentById';

const MasterClass = () => {
  const [studentInfo, setStudentInfo] = useState({
    full_name: '',
    email: '',
    whatsapp_number: '',
    organization_name: '',
    occupation: '',
    whatsapp_group: '',
    facebook_page: '',
    youtube_channel: '',
    facebook_community: '',
  });

  const router = useRouter();
  const { key } = router.query;
  const { data, loading, error } = useFetchDocById('form_data', key);
  const { updateDocument, loadingUpdate, errorUpdate, success } =
    useUpdateDocumentById('form_data', key);

  const handleChange = (key, value) => {
    setStudentInfo((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (let key in studentInfo) {
      if (studentInfo[key] === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all the fields!',
        });
        return; // Stop form submission if validation fails
      }
    }

    const findAlreadyRegistered = data?.subscribed_students.find(
      (item) => item?.whatsapp_number === studentInfo?.whatsapp_number,
    );

    if (findAlreadyRegistered) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This Whatsapp number is already registered!',
      });
      return;
    }

    const updatedForm = {
      ...data,
      id: uuidv4().split('-')[0],
      subscribed_students: [...data?.subscribed_students, studentInfo],
      total_students_registered: parseInt(data?.total_students_registered) + 1,
      alreadyCalled: false,
      createdAt: serverTimestamp(),
    };

    updateDocument(updatedForm);

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Thank you for registering for the Masterclass!',
    }).then(() => {
      router.push('/registration/success');
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#ffffff]">
      <div className="px-4 py-8 md:py-24 mx-auto">
        <div className="max-w-[1400px] mx-auto border-1 shadow-md px-10 py-5">
          <Image
            width={500}
            height={500}
            src="/logo/logo.png"
            alt="DS-360"
            className="w-24 mx-auto mt-4"
          />
          <h2 className="text-2xl md:text-5xl font-bold mt-10 mb-8 text-center text-gray-900 md:leading-[60px]">
            <span className="block text-blue-600 uppercase">
              Free Masterclass
            </span>
            <span className="block">
              Unlock the Secrets of{' '}
              <strong className="text-blue-600">{data?.courseData}</strong>
            </span>
            <span className="block mt-8 text-red-500 uppercase tracking-wide">
              Register Today – Spots Are Limited!
            </span>
          </h2>

          <div
            dangerouslySetInnerHTML={{ __html: data?.formDetails }}
            className="text-base"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <InputField
                keyName="full_name"
                value={studentInfo.full_name}
                onChange={handleChange}
                label="Full Name"
                type="text"
              />

              <InputField
                keyName="email"
                value={studentInfo.email}
                onChange={handleChange}
                label="Your Email"
                type="email"
              />

              <InputField
                keyName="whatsapp_number"
                value={studentInfo.whatsapp_number}
                onChange={handleChange}
                label="WhatsApp Number"
                type="tel"
              />

              <div className="mt-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Occupation:
                </label>
                <Radio.Group
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  value={studentInfo.occupation}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Student"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Student
                    </Radio>
                    <Radio
                      value="Job Holder"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Job Holder
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            <InputField
              keyName="organization_name"
              value={studentInfo.organization_name}
              onChange={handleChange}
              label="Educational Institute/Company Name"
              type="text"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* WhatsApp Group */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Do you join our masterclass WhatsApp group?{' '}
                  <a
                    href={data?.whatsappGroupLink || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 visited:text-blue-600"
                  >
                    Join here
                  </a>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    handleChange('whatsapp_group', e.target.value)
                  }
                  value={studentInfo.whatsapp_group}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Yes"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      No
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* Facebook Page */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Do you follow our Facebook page?{' '}
                  <a
                    href="https://www.facebook.com/Datasolution360"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 visited:text-blue-600"
                  >
                    Follow here
                  </a>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    handleChange('facebook_page', e.target.value)
                  }
                  value={studentInfo.facebook_page}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Yes"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      No
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* YouTube Channel */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Do you subscribe to our YouTube channel?{' '}
                  <a
                    href="https://www.youtube.com/@datasolution-3607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 visited:text-blue-600"
                  >
                    Subscribe here
                  </a>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    handleChange('youtube_channel', e.target.value)
                  }
                  value={studentInfo.youtube_channel}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Yes"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      No
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* Facebook Community */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Do you join our Facebook community?{' '}
                  <a
                    href="https://www.facebook.com/groups/371272054987030"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 visited:text-blue-600"
                  >
                    Join here
                  </a>
                </label>
                <Radio.Group
                  onChange={(e) =>
                    handleChange('facebook_community', e.target.value)
                  }
                  value={studentInfo.facebook_community}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Yes"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-gray-50 border rounded-md py-2 px-4"
                    >
                      No
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 mt-8"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasterClass;

const InputField = ({ keyName, value, onChange, label, type = 'text' }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={keyName}
        className="block text-gray-700 text-sm font-semibold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={keyName}
        value={value}
        onChange={(e) => onChange(keyName, e.target.value)}
        className="w-full px-4 py-3 text-lg outline-[#ff440031] border-1 mt-2 rounded"
        required
      />
    </div>
  );
};
