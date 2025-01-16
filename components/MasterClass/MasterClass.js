import { Radio, Spin } from 'antd';
import { Mail, MessageCircle, Send, User } from 'lucide-react';
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
      subscribed_students: [
        ...(data?.subscribed_students || []),
        {
          ...studentInfo,
          createdAt: new Date().toISOString(),
          id: uuidv4().split('-')[0],
          alreadyCalled: false,
        },
      ],
      total_students_registered: parseInt(data?.total_students_registered) + 1,
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

  if (loadingUpdate) {
    return (
      <div className="min-h-10 flex justify-center items-center">
        <Spin size="medium" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-10 flex justify-center items-center">
        <Spin size="medium" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="px-4 py-8 md:py-24 mx-auto">
        <div className="px-5 md:px-10 py-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 items-center">
              <InputField
                keyName="full_name"
                value={studentInfo.full_name}
                onChange={handleChange}
                label="Full Name"
                placeholder="Type Name"
                icon={<User className="text-xl" />}
                type="text"
              />

              <InputField
                keyName="email"
                value={studentInfo.email}
                onChange={handleChange}
                label="Your Email"
                placeholder="Type Email"
                type="email"
                icon={<Mail className="text-xl" />}
              />

              <InputField
                keyName="whatsapp_number"
                value={studentInfo.whatsapp_number}
                onChange={handleChange}
                label="WhatsApp Number"
                placeholder="Type Whatsapp Number"
                type="tel"
                icon={<MessageCircle className="text-2xl" />}
              />

              <div className="mt-5 mb-5">
                <label className="block text-gray-700 text-base font-bold mb-2 font-form capitalize">
                  Occupation: <span className="text-red-500">*</span>
                </label>
                <Radio.Group
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  value={studentInfo.occupation}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <Radio
                      value="Student"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-blue-500">&#x1F393;</i>{' '}
                        {/* Graduation cap icon */}
                        Student
                      </span>
                    </Radio>
                    <Radio
                      value="Job Holder"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-green-500">&#x1F4BC;</i>{' '}
                        {/* Briefcase icon */}
                        Job Holder
                      </span>
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
              placeholder="Type your organization"
              type="text"
              icon={<Send className="text-2xl" />}
            />

            <div>
              {/* WhatsApp Group */}
              <div className="mt-10">
                <label className="block text-gray-700 text-base font-bold mb-2 font-form capitalize">
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
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-green-500">&#x2714;</i>{' '}
                        {/* Checkmark icon */}
                        Yes
                      </span>
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-red-500">&#x2718;</i>{' '}
                        {/* Cross mark icon */}
                        No
                      </span>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* Facebook Page */}
              <div className="mt-10">
                <label className="block text-gray-700 text-base font-bold mb-2 font-form capitalize">
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
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-green-500">&#x2714;</i>{' '}
                        {/* Checkmark icon */}
                        Yes
                      </span>
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-red-500">&#x2718;</i>{' '}
                        {/* Cross mark icon */}
                        No
                      </span>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* YouTube Channel */}
              <div className="mt-10">
                <label className="block text-gray-700 text-base font-bold mb-2 font-form capitalize">
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
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-green-500">&#x2714;</i>{' '}
                        {/* Checkmark icon */}
                        Yes
                      </span>
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-red-500">&#x2718;</i>{' '}
                        {/* Cross mark icon */}
                        No
                      </span>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>

              {/* Facebook Community */}
              <div className="mt-10">
                <label className="block text-gray-700 text-base font-bold mb-2 font-form capitalize">
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
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-green-500">&#x2714;</i>{' '}
                        {/* Checkmark icon */}
                        Yes
                      </span>
                    </Radio>
                    <Radio
                      value="No"
                      className="w-full bg-white border border-gray-300 rounded-md py-3 px-5 font-form text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center gap-3">
                        {/* Optional: Add an icon here */}
                        <i className="text-red-500">&#x2718;</i>{' '}
                        {/* Cross mark icon */}
                        No
                      </span>
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

const InputField = ({
  keyName,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  icon,
}) => {
  return (
    <div className="w-full mt-5 input-container">
      <label
        htmlFor={keyName}
        className="flex items-center gap-2 text-gray-700 text-base font-bold font-form"
      >
        {icon} {label}
        {/* Adding required asterisk */}
        <span className="text-red-500">*</span> {/* Required indicator */}
      </label>
      <div className="relative w-full">
        <input
          type={type}
          id={keyName}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(keyName, e.target.value)}
          className="w-full px-2 py-3 text-lg bg-transparent font-form"
          required
        />
        <span className="focus-underline"></span>
      </div>
    </div>
  );
};
