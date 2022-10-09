import React, { useState } from "react";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import Select from "react-select";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../../firebase";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStateContext } from "../../../src/context/ContextProvider";

const initialCourseState = {
  id: "",
  title: "",
  author: "",
  lesson: null,
  duration: null,
  difficulty: "",
  details: "",
  price: "",
  img: "",
  date: "",
};

const options = { year: "numeric", month: "long", day: "numeric" };
const selectOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" },
  { value: "All Level", label: "All Level" },
];

const AddCourse = () => {
  const { userEmail } = useStateContext();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertContent, setConvertedContent] = useState(null);
  const [courseData, setCourseData] = useState(initialCourseState);
  const [progressData, setProgressData] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const handleSelect = (data) => {
    setCourseData({ ...courseData, difficulty: data.value });
  };

  const handleFileSubmit = (e) => {
    const fileSize = document.getElementById("photoUrl").files[0].size;
    const courseImg = e.target.files[0];

    if (fileSize < 1024000) {
      const uploadTask = firebase
        .storage()
        .ref(`courseImage/${userEmail}/${courseImg?.name}`)
        .put(courseImg);
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
            .ref("courseImage")
            .child(userEmail)
            .child(courseImg?.name)
            .getDownloadURL()
            .then((url) => {
              // NOTE: use this url
              setCourseData({ ...courseData, img: url });
            });
        }
      );
    } else {
      alert("File Size must be under 1mb");
    }
    console.log(fileSize);
  };

  const handleSubmit = () => {
    if (
      courseData.title !== "" &&
      courseData.lesson !== "" &&
      convertContent !== null &&
      courseData.lesson !== "" &&
      courseData.duration !== "" &&
      courseData.difficulty !== "" &&
      courseData.img !== "" &&
      courseData.author !== "" &&
      courseData.price !== ""
    ) {
      firebase
        .firestore()
        .collection("course_data")
        .add({
          ...courseData,
          id: uuidv4().split("-")[0],
          details: convertContent,
          date: new Date().toLocaleDateString(undefined, options),
        })
        .then(() => {
          alert("Course Data was successfully uploaded.");
          setCourseData(initialCourseState);
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message + "" + "Something went wrong");
        });
      // console.log(courseData);
    } else {
      alert("Course data was not correct.");
    }
  };

  console.log(courseData);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-3/4">
        <h2 className="text-4xl mt-6 pb-4 text-gray-500 text-center capitalize ">
          Add a new course
        </h2>

        {/* NOTE: TITLE */}
        <label htmlFor="title" className="font-semibold mt-3 block">
          Course title
        </label>
        <input
          id="title"
          onChange={(e) =>
            setCourseData({ ...courseData, title: e.target.value })
          }
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        {/* NOTE: AUTHOR */}
        <label htmlFor="title" className="font-semibold mt-3 block">
          Author
        </label>
        <input
          id="title"
          onChange={(e) =>
            setCourseData({ ...courseData, author: e.target.value })
          }
          type="text"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        <label htmlFor="title" className="font-semibold mt-3 block">
          Price
        </label>
        <input
          id="title"
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
          type="number"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        {/* NOTE: lESSONS */}
        <label htmlFor="title" className="font-semibold mt-3 block">
          How many modules/lessons will there be in this course?
        </label>
        <input
          id="title"
          onChange={(e) =>
            setCourseData({ ...courseData, lesson: e.target.value })
          }
          type="number"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        {/* NOTE: DURATION */}
        <label htmlFor="title" className="font-semibold mt-3 block">
          Course duration (in days)
        </label>
        <input
          id="title"
          onChange={(e) =>
            setCourseData({ ...courseData, duration: e.target.value })
          }
          type="number"
          className="w-full px-4 py-2 outline-none border-1 text-lg mt-3 "
        />

        {/* NOTE: DIFFICULTY */}
        <label htmlFor="title" className="font-semibold mt-3 block">
          Difficulty label
        </label>
        <Select onChange={handleSelect} options={selectOptions} />

        {/* NOTE: COURSE IMAGE */}
        <label htmlFor="photoUrl" className="font-semibold mt-3 block">
          Enter course photo
        </label>
        <input
          id="photoUrl"
          onChange={handleFileSubmit}
          type="file"
          className="w-full px-4 py-2 outline-none border-1 mt-3 "
        />

        {/* NOTE: COURSE DESCRIPTION */}
        <p className="font-semibold mt-2">Course Description</p>
        <div className="w-full border-1 p-3 bg-white">
          <Editor
            toolbarOnFocus
            editorState={editorState}
            editorStyle={{ minHeight: "300px" }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="demoWrapper"
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

        <p>{courseData?.date}</p>
      </div>
    </div>
  );
};

export default AddCourse;
