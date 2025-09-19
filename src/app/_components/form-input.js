export const FormInput = (props) => {
  const {
    inputTag,
    placeholder,
    handleChange,
    name,
    value,
    error,
    errorMessage,
    type,
  } = props;

  return (
    <div className="textFeild">
      <span className="label">
        {inputTag} <span className="od">*</span>
      </span>
      <input
        className={error ? "inputContainer-error" : "inputContainer"}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={handleChange}
      />
      {error && <p className="red">{errorMessage}</p>}
    </div>
  );
};
