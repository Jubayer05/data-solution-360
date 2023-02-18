import React, { useState } from "react";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../firebase";

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

const options = { year: "numeric", month: "long", day: "numeric" };

const AddNewBlog = () => {
  const { userEmail } = useStateContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertContent, setConvertedContent] = useState(null);
  const [blogData, setBlogData] = useState(initialBlogState);
  const [progressData, setProgressData] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById("photoUrl").files[0].size;
    const blogImg = e.target.files[0];

    if (fileSize < 512000) {
      const uploadTask = firebase
        .storage()
        .ref(`blogImage/${userEmail}/${blogImg?.name}`)
        .put(blogImg);
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
            .ref("blogImage")
            .child(userEmail)
            .child(blogImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setBlogData({ ...blogData, img: url });
            });
        }
      );
    } else {
      alert("File Size must be under 500kb");
    }
    console.log(fileSize);
  };

  const handleSubmit = () => {
    if (
      blogData.title !== "" &&
      convertContent !== null &&
      blogData.img !== "" &&
      blogData.author !== ""
    ) {
      firebase
        .firestore()
        .collection("blogData")
        .add({
          ...blogData,
          id: uuidv4().split("-")[0],
          details: convertContent,
          slug: blogData.title.split(" ").join("-"),
          date: new Date().toLocaleDateString(undefined, options),
        })
        .then(() => {
          alert("Blog Data was successfully uploaded.");
        })
        .catch((error) => {
          alert(error.message + "" + "Something went wrong");
        });
    } else {
      alert("Blog data was not correct.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-3/4">
        <h2 className="text-4xl mt-6 pb-4 text-gray-500 text-center capitalize ">
          Add a new blog
        </h2>

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
          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-blue-500 text-white rounded-md"
          >
            Submit Content
          </button>
        </div>

        <p>{blogData?.date}</p>
      </div>
    </div>
  );
};

export default AddNewBlog;
