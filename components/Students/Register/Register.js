import React from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import Academic from './Academic';
import BasicInfo from './BasicInfo';

const Register = ({ title }) => {
  return (
    <div>
      <HeadingDashboard title={title} />
      <BasicInfo />
      <Academic />
    </div>
  );
};

export default Register;
