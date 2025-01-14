import React from 'react';
import Select from 'react-select';

const StatusSelect = ({ value, onChange }) => {
  const statusConfig = {
    pending: {
      text: 'Pending',
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      textColor: 'text-[#df7c24]',
    },
    processing: {
      text: 'Processing',
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      textColor: 'text-[#eab308]',
    },
    'module send': {
      text: 'Module Sent',
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      textColor: 'text-[#3b82f6]',
    },
    'phone called': {
      text: 'Phone Called',
      bg: 'bg-teal-50',
      border: 'border-teal-500',
      textColor: 'text-[#14b8a6]',
    },
    'awaiting payment': {
      text: 'Awaiting Payment',
      bg: 'bg-gray-50',
      border: 'border-gray-500',
      textColor: 'text-[#6b7280]',
    },
    'payment failed': {
      text: 'Payment Failed',
      bg: 'bg-red-50',
      border: 'border-red-500',
      textColor: 'text-[#dc2626]',
    },
    'follow-up needed': {
      text: 'Follow-Up Needed',
      bg: 'bg-purple-50',
      border: 'border-purple-500',
      textColor: 'text-[#7c3aed]',
    },
    cancelled: {
      text: 'Cancelled',
      bg: 'bg-red-100',
      border: 'border-red-500',
      textColor: 'text-[#be0909]',
    },
    enrolled: {
      text: 'Enrolled',
      bg: 'bg-green-50',
      border: 'border-green-500',
      textColor: 'text-[#48bb78]',
    },
  };

  const options = Object.entries(statusConfig).map(([value, config]) => ({
    value,
    label: config.text,
    color: config.textColor.replace('text-[', '').replace(']', ''),
    bg: config.bg,
    border: config.border,
  }));

  const customStyles = {
    option: (styles, { data, isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: isSelected
        ? data.color
        : isFocused
        ? `${data.color}15`
        : 'transparent',
      color: isSelected ? '#ffffff' : data.color,
      ':active': {
        backgroundColor: `${data.color}30`,
        color: `#ffffff`,
      },
    }),
    control: (styles) => ({
      ...styles,
      borderRadius: '0.375rem',
      borderColor: '#e2e8f0',
      ':hover': {
        borderColor: '#cbd5e1',
      },
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      styles={customStyles}
      placeholder="Select status"
      className="w-full min-w-[200px]"
    />
  );
};

export default StatusSelect;
