import { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.css';

import { loadData } from '../../../../src/hooks/loadData';
import HeadingDashboard from '../../../utilities/dashboard/HeadingDashboard';
import DueSheet from './DueSheet';

const DueReportHome = () => {
  const [leads, setLeads] = useState([]);
  const [sells, setSells] = useState([]);

  // Load data when the component mounts
  useEffect(() => {
    loadData('lead_data', setLeads);
    loadData('sells_data', setSells);
  }, []);

  return (
    <div>
      <HeadingDashboard title="Due Reports" />
      <div className="max-w-6xl mx-auto my-20 font-dash_heading">
        <DueSheet sells={sells} />
      </div>
    </div>
  );
};

export default DueReportHome;
