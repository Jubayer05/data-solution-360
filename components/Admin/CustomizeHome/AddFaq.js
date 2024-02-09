import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { ssr: false },
);

const AddFaq = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [convertContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.orderFaq) {
      errors.orderFaq = 'Required';
    }

    if (!values.faqTitle) {
      errors.faqTitle = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      faqTitle: '',
      faqAnswer: '',
    },
    validate,
    onSubmit: (values) => {
      firebase
        .firestore()
        .collection('faqData')
        .add({
          ...values,
          faqAnswer: convertContent,
        })
        .then(() => {
          Swal.fire({
            title: 'Success',
            text: 'FAQ is added successfully!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Swal.fire('Hello!', 'Profile cannot updated!', 'error');
        });
    },
  });

  return (
    <div>
      <div className="pt-10 pb-4 px-5 ">
        <div className="max-w-3xl mx-auto bg-white shadow-md border-solid rounded-lg border-gray-300 p-5 my-4">
          <h2 className=" text-xl text-[#1aa5d3] mt-2 mb-6">Add FAQ</h2>
          <div className="mb-6 -mt-3 bg-[#bac6ca] h-0.5" />
          <form onSubmit={formik.handleSubmit}>
            {/* NOTE: order of data */}
            <div className="flex items-center mb-3">
              <label htmlFor="orderFaq" className="w-[240px] sm:w-[300px]">
                Order of FAQ
                {formik.errors.orderFaq ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.orderFaq})
                  </span>
                ) : null}
              </label>
              <input
                id="orderFaq"
                name="orderFaq"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.orderFaq}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
                style={
                  formik.errors.orderFaq && { border: '2px solid orangered' }
                }
              />
            </div>

            {/* NOTE: faqTitle */}
            <div className="flex items-center mb-3">
              <label htmlFor="faqTitle" className="w-[240px] sm:w-[300px]">
                FAQ Title
                {formik.errors.faqTitle ? (
                  <span className="text-xs text-red-600">
                    ({formik.errors.faqTitle})
                  </span>
                ) : null}
              </label>
              <input
                id="faqTitle"
                name="faqTitle"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.faqTitle}
                className="w-full px-2 py-3 rounded-md bg-[#f1f1f1] outline-none"
                style={
                  formik.errors.faqTitle && { border: '2px solid orangered' }
                }
              />
            </div>

            {/* NOTE: faqAnswer */}
            <div className="flex items-start">
              <label className="w-[240px] sm:w-[300px] pt-3">Faq Answer</label>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditorChange}
              />
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full bg-primary-bg text-white px-3 py-2 rounded-lg "
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

export default AddFaq;
