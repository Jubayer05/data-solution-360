import { Progress } from 'antd';
import React, { useRef, useState } from 'react';
import { RiImageAddFill } from 'react-icons/ri';
import firebase from '../../../firebase';
import { useStateContext } from '../../../src/context/ContextProvider';

const FileInput = ({ folderName, setImageState }) => {
  const [progressData, setProgressData] = useState(0);
  const { userEmail } = useStateContext();

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handler for file submission
  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById('photoUrl').files[0].size;
    const image = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`${folderName}/${userEmail}/${image?.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          setProgressData(progress);
        },
        (error) => {
          alert(error.message + '' + 'Something went wrong');
        },
        () => {
          firebase
            .storage()
            .ref(folderName)
            .child(userEmail)
            .child(image?.name)
            .getDownloadURL()
            .then((url) => {
              setImageState(url);
              console.log(url);
            });
        },
      );
    } else {
      alert('File Size must be under 500kb');
    }
  };

  return (
    <div>
      {progressData == 0 ? (
        ''
      ) : (
        <Progress
          percent={progressData}
          status="active"
          strokeColor={{ from: '#108ee9', to: '#87d068' }}
        />
      )}

      <div className="w-full mt-5">
        <input
          id="photoUrl"
          type="file"
          ref={fileInputRef}
          onChange={handleFileSubmit}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-3 bg-[#fecb6c3a] rounded font-semibold flex items-center justify-center gap-2"
        >
          Upload File <RiImageAddFill />
        </button>
      </div>
    </div>
  );
};

export default FileInput;
