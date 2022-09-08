import "./form-input.syles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
    <input className="form-input" {...otherProps} />
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
      {/* on change run the function handleChange and pass it the props displayName*/}
      {/* We are passing the value set in the input to the handleChange*/}
      
    </div>
  );
};

export default FormInput;
