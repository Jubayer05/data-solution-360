const StatusBadge = ({ status }) => {
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

  const config = statusConfig[status] || { text: 'Unknown' }; // Fallback text

  return (
    <span
      className={`${config.bg} ${config.border} px-2 py-1 text-xs rounded-full font-semibold ${config.textColor} pt-[2px]`}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
