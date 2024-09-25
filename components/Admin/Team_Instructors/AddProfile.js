import { Progress } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import firebase from '../../../firebase';
import RichTextEditorJodit from '../../utilities/RichTextEditor/RichTextEditor';
const db = firebase.firestore();

const selectLanguage = [
  {
    label: <div>Core Team Member</div>,
    value: 'Core Team Member',
  },
  {
    label: <div>Employee</div>,
    value: 'Employee',
  },
];

const AddProfile = ({ profile, db_name, showRole }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [progressData, setProgressData] = useState(0);
  const [details, setDetails] = useState('');
  const [editProfile, setEditProfile] = useState(null);

  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 20,
    }),
    control: (_, {}) => ({
      display: 'flex',
      border: '1px solid #e5e5e5',
      padding: '5px 10px',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
    }),
  };

  const handleChangeRole = (item) => {
    setProfileInfo({ ...profileInfo, role: item.value });
  };

  // Handler for file submission
  const handleFileSubmit = (e) => {
    const fileSize = e.target.files[0].size;
    const profileImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`profileImage/${profileImg?.name}`)
        .put(profileImg);
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
            .ref('profileImage')
            .child(profileImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setProfileInfo({ ...profileInfo, photoUrl: url });
            });
        },
      );
    } else {
      alert('File Size must be under 1mb');
    }
  };

  const handleAddProfile = () => {
    if (
      profileInfo.profileName !== '' &&
      profileInfo.photoUrl !== '' &&
      profileInfo.jobTitle !== '' &&
      details !== '' &&
      profileInfo.role !== ''
    ) {
      db.collection(db_name)
        .add({ ...profileInfo, details: details })
        .then(() => {
          Swal.fire(
            'Success!',
            'Member information was successfully uploaded.',
            'success',
          ).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          alert(error.message + '' + 'Something went wrong');
        });
    } else {
      alert('Please provide a valid information!');
    }
  };

  const handleChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const editBtnClick = (item) => {
    setDetails(item.details);
    setEditProfile(item);
  };

  const handleEditMember = () => {
    Swal.fire({
      title: 'Are you sure for edit?',
      text: 'Please check and be aware of making changes!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Edit!',
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection(db_name)
          .doc(editProfile.key)
          .update({ ...editProfile, ...profileInfo, details })
          .then(() => {
            Swal.fire(
              'Done!',
              'Your request for edit is completed.',
              'success',
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  const handleDeleteProfile = (item) => {
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
        db.collection(db_name)
          .doc(item.key)
          .delete()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-5">
        <h2 className="text-xl text text-center my-4 font-bold">
          Profile List
        </h2>
        {profile?.length === 0 ? (
          <p className="text-base">No profile information were added!</p>
        ) : (
          profile?.map((item) => (
            <div key={item.key} className="my-4 shadow-md flex items-center">
              <div className="flex-1">
                <div className="px-4 py-2 rounded-lg text-base font-normal flex items-center justify-between gap-10 bg-white">
                  <div className="flex items-center gap-4">
                    <Image
                      width={500}
                      height={300}
                      className="w-20 h-20 rounded-full"
                      src={item.photoUrl}
                      alt={item.profileName}
                    />
                    <div>
                      <p className="text-xl m-0">
                        <strong>{item.profileName}</strong>
                      </p>
                      <p className="ml-1 text-base m-0">{item.jobTitle}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => editBtnClick(item)}
                      className="px-4 py-2 mx-1 bg-[#3174ae] text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(item)}
                      className="px-4 py-2 mx-1 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="bg-[#f0f0f0] shadow-lg rounded-lg border-dashed px-6 py-3 mt-10">
        <h2 className="text-xl text text-center my-4 font-bold">
          {editProfile ? 'Edit' : 'Add'} Member
        </h2>
        <div className="grid gap-4 grid-cols-2 ">
          <div className={showRole ? 'col-span-1' : 'col-span-2'}>
            <InputBox
              value={profileInfo.profileName}
              editProfile={editProfile}
              title="Name"
              name="profileName"
              id="profileName"
              type="text"
              func={handleChange}
            />
          </div>
          {showRole && (
            <div className="col-span-1">
              <p htmlFor className="font-semibold block text-[#17012e]">
                Select Member&apos;s Role{' '}
                {editProfile && (
                  <span className="ml-2 italic font-thin">
                    (previous:
                    <span className=" text-[orangered] ml-2">
                      {editProfile.role}
                    </span>
                    )
                  </span>
                )}
              </p>
              <Select
                className="w-full mt-2"
                styles={customStyles}
                options={selectLanguage}
                defaultValue={selectLanguage[0]}
                onChange={handleChangeRole}
              />
            </div>
          )}
          <div className="col-span-2">
            <InputBox
              editProfile={editProfile}
              value={profileInfo.jobTitle}
              title="Job Title"
              name="jobTitle"
              id="jobTitle"
              type="text"
              func={handleChange}
            />
          </div>
          <div className="col-span-1">
            <InputBox
              editProfile={editProfile}
              value={profileInfo.facebookLink}
              title="Facebook Link"
              name="facebookLink"
              id="facebookLink"
              type="text"
              func={handleChange}
            />
          </div>
          <div className="col-span-1">
            <InputBox
              editProfile={editProfile}
              value={profileInfo.linkedInLink}
              title="LinkedIn Link"
              name="linkedInLink"
              id="linkedInLink"
              type="text"
              func={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor className="font-semibold block text-[#17012e]">
              Image of the member
            </label>
            {editProfile && (
              <span className="ml-2 italic font-thin">
                (previous:
                <Image
                  width={500}
                  height={300}
                  src={editProfile.photoUrl}
                  className="w-20"
                  alt=""
                />
                )
              </span>
            )}
            <input
              id="photoUrl"
              onChange={handleFileSubmit}
              type="file"
              className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded bg-white"
            />
          </div>
        </div>
        <Progress
          percent={progressData}
          size="small"
          strokeColor={conicColors}
        />

        <RichTextEditorJodit
          title="Add Members information"
          onDataChange={setDetails}
          value={details}
        />

        <div className="w-full text-center pt-5 pb-4">
          <button
            onClick={editProfile ? handleEditMember : handleAddProfile}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            {editProfile ? 'Change Edit & Submit' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;

const InputBox = ({
  title,
  type,
  id,
  func,
  placeholder,
  name,
  value,
  editProfile,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold block text-[#17012e]">
        {title}
        {editProfile && (
          <span className="ml-2 italic font-thin">
            (previous:
            <span className=" text-[orangered] ml-2">{editProfile[name]}</span>)
          </span>
        )}
      </label>
      <input
        value={value}
        id={id}
        onChange={func}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
      />
    </div>
  );
};
