import { useEffect, useState } from 'react';
import Select from 'react-select';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import { loadData } from '../../../src/hooks/loadData';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import LeadsForSells from './LeadsForSells';
import ShowSells from './ShowSells';

const db = firebase.firestore();

const SellsTracking = () => {
  const { findCurrentUser } = useStateContext();
  const [takeLead, setTakeLead] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('Partial');
  const [paidAmount, setPaidAmount] = useState('');
  const [dueAmount, setDueAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueStatus, setDueStatus] = useState('Pending');
  const [batchName, setBatchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [sells, setSells] = useState([]);

  const uniqueId = uuidv4().split('-')[0];
  const timestamp = new Date().toISOString();

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
    loadData('sells_data', setSells);
  }, []);

  useEffect(() => {
    setCustomerName(takeLead?.customer_name);
    setCustomerNumber(takeLead?.customer_phoneNumber);
    setStatus(takeLead?.status);
  }, [takeLead]);

  const handleSubmitLead = () => {
    setLoading(true);
    if (customerName && customerNumber && paidAmount) {
      const newSells = {
        uniqueId,
        createdAt: timestamp,
        customer_name: customerName,
        customer_phoneNumber: customerNumber,
        course_name: takeLead?.course_name,
        status,
        payment,
        paid_amount: paidAmount,
        due_amount: dueAmount,
        due_date: dueDate,
        due_status: dueStatus,
        batch_name: batchName,
        sells_processed: {
          name: findCurrentUser?.full_name || 'N/A',
          email: findCurrentUser?.email,
        },
        lead_processed: takeLead?.lead_processed,
      };

      db.collection('sells_data')
        .add(newSells)
        .then(() => {
          db.collection('lead_data')
            .doc(takeLead?.id)
            .update({ ...takeLead, status: status })
            .then(() => {
              Swal.fire(
                'Sells Submitted!',
                'The Sells information has been successfully submitted.',
                'success',
              ).then(() => {
                setLoading(false);
                window.location.reload();
              });
            });
        });
    } else {
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  };

  return (
    <div>
      <HeadingDashboard title="Track a Lead" />
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <LeadsForSells
          leads={leads}
          setLeads={setLeads}
          setTakeLead={setTakeLead}
        />
        <div className="max-w-6xl mx-auto border-1 p-8 rounded-lg bg-white mt-10">
          <h2 className="text-2xl pb-4 text-[#231f40] text-center font-medium font-dash_heading">
            <span className="font-bold">Sells From</span>
          </h2>

          <h2 className="text-xl pb-4 text-[#231f40] font-medium font-dash_heading mt-20">
            Course Name:{' '}
            <span className="text-primary"> {takeLead?.course_name}</span>
          </h2>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label
                htmlFor="customer_name"
                className="font-semibold block text-[#17012e]"
              >
                Enter Customer Name
              </label>
              <input
                placeholder="Enter customer's full name"
                className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
                type="text"
                id="customer_name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="customer_number"
                className="font-semibold block text-[#17012e]"
              >
                Enter Customer Phone Number
              </label>
              <input
                placeholder="Enter phone number"
                className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
                type="number"
                id="customer_number"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label
                htmlFor="status"
                className="font-semibold block text-[#17012e]"
              >
                Status
              </label>
              <Select
                className="w-full pt-2"
                styles={customStyles}
                options={[
                  { label: 'Pending', value: 'pending' },
                  { label: 'Enrolled', value: 'enrolled' },
                  { label: 'Cancelled', value: 'cancelled' },
                ]}
                onChange={(option) => setStatus(option.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="payment"
                className="font-semibold block text-[#17012e]"
              >
                Payment Status
              </label>
              <Select
                className="w-full pt-2"
                styles={customStyles}
                options={[
                  { label: 'Partial', value: 'Partial' },
                  { label: 'Full', value: 'Full' },
                ]}
                onChange={(option) => setPayment(option.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label
                htmlFor="paid_amount"
                className="font-semibold block text-[#17012e]"
              >
                Paid Amount
              </label>
              <input
                placeholder="Enter paid amount"
                className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
                type="number"
                id="paid_amount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="due_amount"
                className="font-semibold block text-[#17012e]"
              >
                Due Amount
              </label>
              <input
                placeholder="Enter due amount"
                className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
                type="number"
                id="due_amount"
                value={dueAmount}
                onChange={(e) => setDueAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
              <label
                htmlFor="due_date"
                className="font-semibold block text-[#17012e]"
              >
                Due Collection Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
                id="due_date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="due_status"
                className="font-semibold block text-[#17012e]"
              >
                Due Collection Status
              </label>
              <Select
                className="w-full pt-2"
                styles={customStyles}
                options={[
                  { label: 'Pending', value: 'Pending' },
                  { label: 'Completed', value: 'Completed' },
                ]}
                onChange={(option) => setDueStatus(option.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="batch_name"
              className="font-semibold block text-[#17012e]"
            >
              Batch Name
            </label>
            <input
              placeholder="Enter batch name"
              className="w-full px-4 py-3 text-lg outline-none border-1 rounded mt-2"
              type="text"
              id="batch_name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-10">
            <ButtonDashboard
              onClick={handleSubmitLead}
              className="bg-secondary_btn hover:bg-secondary_btn hover:opacity-80 text-white"
            >
              {loading ? 'Submitting Sells...' : 'Submit Sells'}
            </ButtonDashboard>
          </div>
        </div>

        <ShowSells sells={sells} />
      </div>
    </div>
  );
};

export default SellsTracking;

const customStyles = {
  menu: (provided) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid #e5e5e5',
    padding: '5px 10px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
  }),
};
