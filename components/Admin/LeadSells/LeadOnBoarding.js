import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../../firebase';

import Swal from 'sweetalert2';
import { useStateContext } from '../../../src/context/ContextProvider';
import { loadData } from '../../../src/hooks/loadData';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import LeadsForSells from './LeadsForSells';

const db = firebase.firestore();

const LeadOnBoarding = () => {
  const { findCurrentUser } = useStateContext();
  const [takeLead, setTakeLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [sells, setSells] = useState([]);

  const uniqueId = uuidv4().split('-')[0];
  const timestamp = new Date().toISOString();

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
    loadData('sells_data', setSells);
  }, []);

  const handleTakeLead = (lead) => {
    const newSells = {
      uniqueId,
      createdAt: timestamp,
      customer_name: lead.customer_name,
      customer_phoneNumber: lead.customer_phoneNumber,
      course_name: lead.course_name,
      status: 'processing',
      sells_processed: {
        name: findCurrentUser?.full_name || 'N/A',
        email: findCurrentUser?.email,
      },
      lead_processed: lead?.lead_processed,
    };

    db.collection('sells_data')
      .add(newSells)
      .then(() => {
        db.collection('lead_data')
          .doc(lead?.id)
          .update({ ...takeLead, status: 'processing' })
          .then(() => {
            Swal.fire(
              'Lead Taken!',
              `The lead is taken right now by ${findCurrentUser?.full_name}.`,
              'success',
            ).then(() => {
              window.location.reload();
            });
          });
      });
  };

  return (
    <div>
      <HeadingDashboard title="Lead on Boarding" />
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <LeadsForSells
          leads={leads}
          setLeads={setLeads}
          setTakeLead={setTakeLead}
          handleTakeLead={handleTakeLead}
        />
      </div>
    </div>
  );
};

export default LeadOnBoarding;
