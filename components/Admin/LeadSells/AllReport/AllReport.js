import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import firebase from '../../../../firebase';

import { loadData } from '../../../../src/hooks/loadData';
import HeadingDashboard from '../../../utilities/dashboard/HeadingDashboard';
import LeadsForSells from '../LeadsForSells';
import ReportData from './ReportData';

const db = firebase.firestore();

const AllReport = () => {
  const [takeLead, setTakeLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [sells, setSells] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
    loadData('sells_data', setSells);
  }, []);

  return (
    <div>
      <HeadingDashboard title="All Reports" />
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <LeadsForSells
          leads={leads}
          setLeads={setLeads}
          setTakeLead={setTakeLead}
        />

        <ReportData sells={sells} />
      </div>
    </div>
  );
};

export default AllReport;

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
