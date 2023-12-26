import React from 'react';
import 'sweetalert2/dist/sweetalert2.css';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import Academic from './Academic';
import BasicInfo from './BasicInfo';
import ContactInfo from './ContactInfo';
import Photo from './Photo';

const Register = ({ title }) => {
  return (
    <div>
      <HeadingDashboard title={title} />
      <BasicInfo />
      <Photo />
      <ContactInfo />
      <Academic />
    </div>
  );
};

export default Register;
