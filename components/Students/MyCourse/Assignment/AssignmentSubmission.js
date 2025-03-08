import {
  CloseOutlined,
  DownloadOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { message, Spin } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import firebase from '../../../../firebase';
import ButtonDashboard from '../../../utilities/dashboard/ButtonDashboard';

const storage = firebase.storage();

const AssignmentSubmission = ({
  title,
  assignmentLinks,
  setAssignmentLinks,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);

  const allowedFileTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerbi',
    'application/pdf',
    'text/csv',
    // Python
    // SQL
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      const isValidType = allowedFileTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        message.error(`Invalid type: ${file.name}`);
        return false;
      }

      if (!isValidSize) {
        message.error(`File too large: ${file.name}`);
        return false;
      }

      return true;
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (fileToRemove) => {
    setSelectedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      message.error('Select files first');
      return;
    }

    setFileLoading(true);
    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        const fileRef = ref(storage, `assignments/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return { file, downloadURL };
      } catch (error) {
        message.error(`Upload failed: ${file.name}`);
        return null;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((result) => result !== null);

      setAssignmentLinks(successfulUploads);
      setSelectedFiles([]);
      message.success(`${successfulUploads.length} files uploaded`);
    } catch (error) {
      message.error('File upload failed');
    } finally {
      setFileLoading(false);
    }
  };

  const handleFileDownload = (downloadURL) => {
    window.open(downloadURL, '_blank');
  };

  return (
    <div className="bg-white border-1 p-5 rounded-lg mt-5">
      <h2 className="text-lg text-center pb-4 text-[#5e5eff] font-medium font-dash_heading">
        {title}
      </h2>

      <input
        type="file"
        multiple
        accept={allowedFileTypes.join(',')}
        onChange={handleFileChange}
        className="w-full p-2 border rounded-lg mb-3"
      />

      {/* Selected Files Preview */}
      {selectedFiles.map((file, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FileOutlined className="mr-2" />
            <span>{file.name}</span>
          </div>
          <CloseOutlined
            onClick={() => removeFile(file)}
            className="text-red-500 cursor-pointer"
          />
        </div>
      ))}

      {selectedFiles.length > 0 && (
        <ButtonDashboard
          onClick={handleFileUpload}
          disabled={fileLoading}
          className="mt-3 w-full bg-primary_btn hover:bg-[#002346bc] text-white"
        >
          {fileLoading ? (
            <Spin size="small" />
          ) : (
            `Upload ${selectedFiles.length} Files`
          )}
        </ButtonDashboard>
      )}

      {/* Uploaded Files Preview */}
      {assignmentLinks?.map(({ file, downloadURL }, index) => (
        <div key={index} className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <FileOutlined className="mr-2" />
            <span>{file.name}</span>
          </div>
          <DownloadOutlined
            onClick={() => handleFileDownload(downloadURL)}
            className="text-primary_btn cursor-pointer text-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default AssignmentSubmission;
