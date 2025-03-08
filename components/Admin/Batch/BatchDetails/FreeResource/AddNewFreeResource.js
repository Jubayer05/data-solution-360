import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../../../firebase';
import { loadData } from '../../../../../src/hooks/loadData';
import ButtonDashboard from '../../../../utilities/dashboard/ButtonDashboard';
import InputBox from '../../../Course/InputBox';

const db = firebase.firestore();

const AddFreeResource = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceLinks, setResourceLinks] = useState('');
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { batchId } = router.query;

  console.log(title, description, resourceLinks);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  const findCourseData = courseDataBatch.find((item) => item.id === batchId);
  const freeResources = findCourseData?.free_resources || [];

  const handleAddResource = async () => {
    if (!title || !description || !resourceLinks) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    const resourceContent = {
      id: uuidv4().split('-')[0],
      title,
      description,
      links: resourceLinks,
    };

    const newCourseData = {
      ...findCourseData,
      free_resources: [
        ...(findCourseData?.free_resources || []),
        resourceContent,
      ],
    };

    try {
      setLoading(true);
      await db
        .collection('course_data_batch')
        .doc(findCourseData?.id)
        .update(newCourseData);
      Swal.fire('Success', 'Resource added successfully!', 'success').then(
        () => {
          window.location.reload();
        },
      );
      setTitle('');
      setDescription('');
      setResourceLinks('');
    } catch (error) {
      console.error('Error adding resource:', error);
      Swal.fire('Error', 'Failed to add resource. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = (resourceId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const updatedResources = freeResources.filter(
            (resource) => resource.id !== resourceId,
          );

          const newCourseData = {
            ...findCourseData,
            free_resources: updatedResources,
          };

          await db
            .collection('course_data_batch')
            .doc(findCourseData?.id)
            .update(newCourseData);

          Swal.fire('Deleted!', 'Resource has been deleted.', 'success').then(
            () => {
              window.location.reload();
            },
          );
        } catch (error) {
          console.error('Error deleting resource:', error);
          Swal.fire(
            'Error',
            'Failed to delete resource. Please try again.',
            'error',
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="my-16 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Free Resource
      </h2>
      <div className="space-y-4">
        <InputBox
          className="py-1"
          title="Resource Title"
          placeholder="Enter resource title"
          type="text"
          value={title}
          func={(id, value) => setTitle(value)}
        />
        <InputBox
          className="py-1 mt-5"
          title="Short Description"
          placeholder="Enter a short description"
          type="text"
          value={description}
          func={(id, value) => setDescription(value)}
        />
        <InputBox
          className="py-1 mt-5"
          title="Resource Links (comma separated)"
          placeholder="Enter links"
          type="text"
          value={resourceLinks}
          func={(id, value) => setResourceLinks(value)}
        />
      </div>
      <div className="flex justify-center mt-6">
        <ButtonDashboard
          onClick={handleAddResource}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
          disabled={loading}
        >
          {loading ? <Spin size="medium" /> : 'Submit Resource'}
        </ButtonDashboard>
      </div>

      {/* Display existing resources */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Resources
        </h3>

        {freeResources.length === 0 ? (
          <p className="text-gray-500 italic">No resources added yet.</p>
        ) : (
          <div className="space-y-4">
            {freeResources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {resource.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-500">
                      Links:
                    </span>
                    <p className="text-sm text-blue-600 break-words">
                      {resource.links}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="ml-4 text-red-500 hover:text-red-700 p-1"
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFreeResource;
