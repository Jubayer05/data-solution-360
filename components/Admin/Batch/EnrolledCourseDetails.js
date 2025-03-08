import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../firebase';

import { loadData } from '../../../src/hooks/loadData';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import AddAssignment from './BatchDetails/Assignment/AddAssignment';
import AssignmentComp from './BatchDetails/Assignment/AssignmentComp';
import AssignmentTrackingMatrix from './BatchDetails/Assignment/AssignmentTrackingMatrix';
import EnrolledStudent from './BatchDetails/EnrolledStudents';
import AddFreeResource from './BatchDetails/FreeResource/AddNewFreeResource';
import ManualPayment from './BatchDetails/ManualPayment';
import ModuleDetails from './BatchDetails/ModuleDetails';

const db = firebase.firestore();

const EnrolledCourseDetails = () => {
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
    const url = window.location.href.split('/').slice(-1)[0];
    setUrl(url);
  }, []);

  const currentEnrolledCourse = courseDataBatch.find(
    (course) => course.id === url,
  );

  return (
    <div>
      <HeadingDashboard
        title={currentEnrolledCourse?.courseData.item_name}
        batchNo={currentEnrolledCourse?.batchNumber}
      />
      <div className="max-w-5xl mx-auto my-20">
        <EnrolledStudent />
        <ManualPayment />
        <ModuleDetails />
        <AssignmentComp />
        <AssignmentTrackingMatrix />
        <AddAssignment />
        <AddFreeResource />
      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
