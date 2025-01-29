import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import StatusSelect from '../Utils/StatusSelect';

const SellsModal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phoneNumber: '',
    status: '',
    payment: '',
    paid_amount: '',
    due_amount: '',
    due_date: '',
    due_status: '',
    batch_name: '',
    followup_date: '', // New field for followup date
  });

  const inputRefs = {
    paid_amount: useRef(null),
    due_amount: useRef(null),
    due_date: useRef(null),
    batch_name: useRef(null),
    followup_date: useRef(null), // New ref for followup date
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        customer_name: initialData.customer_name || '',
        customer_phoneNumber: initialData.customer_phoneNumber || '',
        status: initialData.status || '',
        payment: initialData.payment || '',
        paid_amount: initialData.paid_amount || '',
        due_amount: initialData.due_amount || '',
        due_date: initialData.due_date || '',
        due_status: initialData.due_status || '',
        batch_name: initialData.batch_name || '',
        followup_date: initialData.followup_date || '', // Initialize followup date
      });

      // Set initial values to refs
      Object.keys(inputRefs).forEach((key) => {
        if (inputRefs[key].current) {
          inputRefs[key].current.value = initialData[key] || '';
        }
      });
    }
  }, [initialData]);

  const isFormEnabled = formData.status === 'enrolled';
  const showFollowupDate = formData.status === 'follow-up needed';

  console.log(formData.status);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, status: selectedOption.value }));
  };

  const handleSelectChange = (name) => (option) => {
    setFormData((prev) => ({ ...prev, [name]: option.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update formData with current ref values before submitting
    const updatedFormData = { ...formData };
    Object.keys(inputRefs).forEach((key) => {
      if (inputRefs[key].current) {
        updatedFormData[key] = inputRefs[key].current.value;
      }
    });
    onSubmit(updatedFormData);
  };

  const SimpleInput = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        ref={inputRefs[name]}
        type={type}
        name={name}
        defaultValue={formData[name]}
        onBlur={handleBlur}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          !isFormEnabled && name !== 'followup_date'
            ? 'bg-gray-100 opacity-60 cursor-not-allowed'
            : ''
        }`}
        placeholder={placeholder}
        disabled={!isFormEnabled && name !== 'followup_date'}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        {/* Customer Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-black mb-4">
            Customer Information
          </h3>
          <div className="flex justify-between">
            <h3 className="text-xl">
              <strong className="text-blue-500">
                {formData.customer_name}
              </strong>
            </h3>
            <h3 className="text-xl">
              <strong className="text-blue-500">
                {formData.customer_phoneNumber}
              </strong>
            </h3>
          </div>
        </div>

        {/* Status and Payment */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-black mb-4">
            Status & Payment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Status
              </label>
              <StatusSelect
                value={{ value: formData.status, label: formData.status }}
                onChange={handleStatusChange}
                options={[
                  { label: 'Enrolled', value: 'enrolled' },
                  { label: 'Follow Up Needed', value: 'follow up needed' },
                  // Add other status options as needed
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Payment Status
              </label>
              <Select
                value={{ value: formData.payment, label: formData.payment }}
                onChange={handleSelectChange('payment')}
                options={[
                  { label: 'Partial', value: 'Partial' },
                  { label: 'Full', value: 'Full' },
                ]}
                isDisabled={!isFormEnabled}
              />
            </div>
          </div>

          {/* Follow-up Date field - only shown when status is "follow up needed" */}
          {showFollowupDate && (
            <div className="mt-4">
              <SimpleInput
                label="Follow-up Date"
                name="followup_date"
                type="date"
              />
            </div>
          )}
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-black mb-4">
            Payment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SimpleInput
              label="Paid Amount"
              name="paid_amount"
              type="number"
              placeholder="Enter paid amount"
            />
            <SimpleInput
              label="Due Amount"
              name="due_amount"
              type="number"
              placeholder="Enter due amount"
            />
          </div>
        </div>

        {/* Due Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-black mb-4">Due Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SimpleInput label="Due Date" name="due_date" type="date" />
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Due Status
              </label>
              <Select
                value={{
                  value: formData.due_status,
                  label: formData.due_status,
                }}
                onChange={handleSelectChange('due_status')}
                options={[
                  { label: 'Pending', value: 'Pending' },
                  { label: 'Completed', value: 'Completed' },
                ]}
                isDisabled={!isFormEnabled}
              />
            </div>
          </div>
        </div>

        {/* Batch Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-black mb-4">
            Batch Information
          </h3>
          <SimpleInput
            label="Batch Name"
            name="batch_name"
            placeholder="Enter batch name"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Save Changes' : 'Create Sale'}
        </button>
      </div>
    </form>
  );
};

export default SellsModal;
