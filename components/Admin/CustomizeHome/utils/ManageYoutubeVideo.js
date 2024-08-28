import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';
import YoutubeEmbed from '../../../utilities/YoutubeEmbed';
const db = firebase.firestore();

const ManageYoutubeVideo = ({ title, videoInfo }) => {
  const formik = useFormik({
    initialValues: {
      youtubeVideo: '',
    },
    onSubmit: (values) => {
      let embedId = extractEmbedId(values.youtubeVideo);

      if (embedId) {
        db.collection('youtubeVideo')
          .doc(videoInfo.key)
          .update({
            embedId,
          })
          .then(() => {
            Swal.fire({
              title: 'Hello',
              text: 'YouTube video successfully added.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Okay',
            });
          })
          .catch((err) => {
            Swal.fire('Hello!', 'YouTube video cannot updated!', 'error');
          });
      } else {
        Swal.fire('Hello!', 'Invalid YouTube URL!', 'error');
      }
    },
  });

  return (
    <div id="manage_youtube">
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">{title}</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <h2>Current Youtube Video</h2>
          <div className="w-[400px] mx-auto">
            <YoutubeEmbed
              embedId={videoInfo?.embedId}
              width="300px"
              height="200px"
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center mt-3">
              <label htmlFor="youtubeVideo" className="w-[240px] sm:w-[300px]">
                Link of the youtube video
              </label>
              <input
                id="youtubeVideo"
                name="youtubeVideo"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.youtubeVideo}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                // disabled={progressData === 100 ? false : true}
                className="w-full bg-primary-bg text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                Save and Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageYoutubeVideo;

function extractEmbedId(url) {
  let match;

  // Check for the "https://www.youtube.com/watch?v=VIDEO_ID" format
  match = url.match(/[?&]v=([^&]+)/);
  if (match) {
    return match[1];
  }

  // Check for the "https://youtu.be/VIDEO_ID" format
  match = url.match(/youtu\.be\/([^?]+)/);
  if (match) {
    return match[1];
  }

  return null;
}
