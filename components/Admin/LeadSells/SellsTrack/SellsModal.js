import { useEffect, useState } from 'react';
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
  });

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
      });
    }
  }, [initialData]);

  const isFormEnabled = formData.status === 'enrolled';

  const handleChange = (e) => {
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
    onSubmit(formData);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #E2E8F0',
      borderRadius: '0.375rem',
      minHeight: '42px',
      boxShadow: 'none',
      opacity: isFormEnabled ? 1 : 0.6,
      backgroundColor: isFormEnabled ? 'white' : '#f3f4f6',
      '&:hover': {
        border: '1px solid #CBD5E0',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3B82F6'
        : state.isFocused
        ? '#EFF6FF'
        : 'white',
      color: state.isSelected ? 'white' : '#1F2937',
    }),
  };

  const FormSection = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-black mb-4">{title}</h3>
      {children}
    </div>
  );

  const InputField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    options,
  }) => {
    if (type === 'select') {
      return (
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            {label}
          </label>
          <Select
            value={{ label: value, value: value }}
            onChange={handleSelectChange(name)}
            options={options}
            styles={customSelectStyles}
            placeholder={placeholder}
            isDisabled={!isFormEnabled && name !== 'status'}
          />
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            !isFormEnabled ? 'bg-gray-100 opacity-60 cursor-not-allowed' : ''
          }`}
          placeholder={placeholder}
          disabled={!isFormEnabled}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        {/* Customer Information */}
        <FormSection title="Customer Information">
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
        </FormSection>

        {/* Status and Payment */}
        <FormSection title="Status & Payment">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Status
              </label>
              <StatusSelect
                value={{ value: formData.status, label: formData.status }}
                onChange={handleStatusChange}
              />
            </div>
            <InputField
              label="Payment Status"
              name="payment"
              type="select"
              value={formData.payment}
              options={[
                { label: 'Partial', value: 'Partial' },
                { label: 'Full', value: 'Full' },
              ]}
              placeholder="Select payment status"
            />
          </div>
        </FormSection>

        {/* Payment Details */}
        <FormSection title="Payment Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Paid Amount"
              name="paid_amount"
              type="number"
              value={formData.paid_amount}
              onChange={handleChange}
              placeholder="Enter paid amount"
            />
            <InputField
              label="Due Amount"
              name="due_amount"
              type="number"
              value={formData.due_amount}
              onChange={handleChange}
              placeholder="Enter due amount"
            />
          </div>
        </FormSection>

        {/* Due Details */}
        <FormSection title="Due Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Due Date"
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
            />
            <InputField
              label="Due Status"
              name="due_status"
              type="select"
              value={formData.due_status}
              options={[
                { label: 'Pending', value: 'Pending' },
                { label: 'Completed', value: 'Completed' },
              ]}
              placeholder="Select due status"
            />
          </div>
        </FormSection>

        {/* Batch Information */}
        <FormSection title="Batch Information">
          <InputField
            label="Batch Name"
            name="batch_name"
            value={formData.batch_name}
            onChange={handleChange}
            placeholder="Enter batch name"
          />
        </FormSection>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
