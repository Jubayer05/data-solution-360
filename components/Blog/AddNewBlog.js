import React, { useState } from "react";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStateContext } from "../../src/context/ContextProvider";

const initialBlogState = {
  id: "",
  title: "",
  slug: "",
  details: "",
  img: "",
  author: "",
  date: "",
};

const AddNewBlog = () => {
  const { userEmail } = useStateContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertContent, setConvertedContent] = useState();
  const [blogData, setBlogData] = useState(initialBlogState);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);

    console.log(currentContentAsHTML);
  };

  const handleFileSubmit = () => {
    const fileSize = document.getElementById("photoUrl").files[0].size;
    const profileImg = e.target.files[0];

    if (fileSize < 512000) {
      const uploadTask = firebase
        .storage()
        .ref(`profileImage/${userEmail}/${profileImg?.name}`)
        .put(profileImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgressData(progress);
        },
        (error) => {
          alert(error.message + "" + "Something went wrong");
        },
        () => {
          firebase
            .storage()
            .ref("profileImage")
            .child(userEmail)
            .child(profileImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setPhotoUrl(url);
            });
        }
      );
    } else {
      alert("File Size must be under 500kb");
    }
    console.log(fileSize);
  };

  console.log(userEmail);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-3/4">
        <label htmlFor="title" className="font-semibold mt-3 block">
          Blog heading / Blog title
        </label>
        <input
          id="title"
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="title" className="font-semibold mt-3 block">
          Slug / URL paths
        </label>
        <input
          id="title"
          onChange={(e) => setBlogData({ ...blogData, slug: e.target.value })}
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="title" className="font-semibold mt-3 block">
          Author
        </label>
        <input
          id="title"
          onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="photoUrl" className="font-semibold mt-3 block">
          Main blog image
        </label>
        <input
          id="photoUrl"
          onChange={handleFileSubmit}
          type="file"
          className="w-full px-4 py-2 outline-none border-1 mt-3 "
        />

        <p className="font-semibold mt-2">Full blog description</p>
        <div className="w-full border-1 p-3">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
          />
        </div>

        <div className="w-full text-center pt-5 pb-16">
          <button className="px-4 py-3 bg-blue-500 text-white rounded-md">
            Submit Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewBlog;
