import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import ShowLeads from './ShowLeads';

const db = firebase.firestore();

const LeadTracking = () => {
  const { courseData, findCurrentUser } = useStateContext();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const uniqueId = uuidv4().split('-')[0];
  const timestamp = new Date().toISOString();
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
  }, []);

  // NOTE: SELECT COURSE
  const selectCourse = courseData.map((item) => ({
    label: (
      <div className="flex items-center gap-4">
        <Image
          width={500}
          height={300}
          className="w-16 h-12"
          src={item.img}
          alt={item.profileName}
        />
        <div>
          <p className="text-lg m-0">
            <strong>{item.item_name}</strong>
          </p>
        </div>
      </div>
    ),
    value: { ...item },
  }));

  const handleChange = (record) => {
    setSelectedCourse(record.value);
  };

  // NOTE: HANDLE SUBMIT LEAD
  const handleSubmitLead = () => {
    setLoading(true);
    if (customerName && customerNumber && selectedCourse) {
      const newLead = {
        uniqueId: uniqueId,
        createdAt: timestamp,
        customer_name: customerName,
        customer_phoneNumber: customerNumber,
        course_name: selectedCourse.item_name,
        feedback: feedback,
        status: 'pending',
        other_details: otherDetails,
        lead_processed: {
          name: findCurrentUser?.full_name || 'N/A',
          email: findCurrentUser?.email,
        },
      };

      db.collection('lead_data')
        .add(newLead)
        .then(() => {
          Swal.fire(
            'Lead Submitted!',
            'The lead information has been successfully submitted.',
            'success',
          ).then(() => {
            setLoading(false);
            window.location.reload();
          });
        });
    } else {
      Swal.fire(
        'Warning!',
        'Please fill in all required fields (Name, Number, and Course).',
        'warning',
      );
    }
  };

  return (
    <div>
      <HeadingDashboard title="Track a Lead" />
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <div className="max-w-3xl mx-auto border-1 p-5 rounded-lg bg-white mt-10">
          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading ">
            <span className="font-bold">Select a course</span>
          </h2>

          <Select
            className="w-full"
            styles={customStyles}
            options={selectCourse}
            onChange={handleChange}
          />

          <label
            htmlFor="customer_name"
            className="font-semibold mt-3 block text-[#17012e]"
          >
            Enter Customer Name
          </label>
          <input
            placeholder="Enter customer's full name"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            type="text"
            id="customer_name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label
            htmlFor="customer_number"
            className="font-semibold mt-3 block text-[#17012e]"
          >
            Enter Customer Phone Number
          </label>
          <input
            placeholder="Enter phone number"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            type="number"
            onWheel={(e) => e.target.blur()}
            id="customer_number"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
          />

          <label
            htmlFor="feedback"
            className="font-semibold mt-3 block text-[#17012e]"
          >
            Feedback / Notes
          </label>
          <textarea
            placeholder="Add feedback or notes here"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <label
            htmlFor="other_details"
            className="font-semibold mt-3 block text-[#17012e]"
          >
            Other Details
          </label>
          <textarea
            placeholder="Add any additional details here"
            className="w-full px-4 py-3 text-lg outline-none border-1 mt-2 rounded"
            id="other_details"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
          ></textarea>

          <div className="flex justify-center mt-10">
            <ButtonDashboard
              onClick={handleSubmitLead}
              className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
            >
              {loading ? 'Submitting Lead...' : 'Submit Lead'}
            </ButtonDashboard>
          </div>
        </div>

        <ShowLeads leads={leads} setLeads={setLeads} />
      </div>
    </div>
  );
};

export default LeadTracking;

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
