import Input from 'component/Shared/Input';
const CustomInput = ({ labelFor, labelText, type, autoComplete, value, onChange, name, id, width, className, placeholder }) => {
    return (
      <div id="input-field" className={className}>
        <label htmlFor={labelFor}>{labelText}</label>
        <Input type={type} autoComplete={autoComplete}
          value={value} onChange={onChange} name={name}
          id={id} width={width} placeholder={placeholder} />
      </div>
    );
  };

export default CustomInput;