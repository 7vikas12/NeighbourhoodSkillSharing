const FormInput = ({ label, type, value, onChange }) => (
  <label>
    {label}
    <input type={type} value={value} onChange={onChange} required />
  </label>
);

export default FormInput;