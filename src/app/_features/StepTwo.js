"use client";

import { FormInput } from "../_components/form-input";
import { useState } from "react";

const addStepTwoValuesToLocalStorage = (value) => {
  localStorage.setItem(`stepTwo`, JSON.stringify(value));
};

export const StepTwo = (props) => {
  const { handleNextStep, handleBackStep } = props;
  const getStepTwoValuesFromLocalStorage = () => {
    const value = localStorage.getItem(`stepTwo`);
    if (value) {
      return JSON.parse(value);
    } else {
      return {
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      };
    }
  };
  const [formValue, setFormValue] = useState(
    getStepTwoValuesFromLocalStorage()
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorState, setErrorState] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    const errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!/^[0-9]{8,12}$/.test(formValue.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number.";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,}$/.test(formValue.password)) {
      errors.password =
        "Password must be 8+ chars and include at least 1 letter and 1 number.";
    }
    if (formValue.password !== formValue.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepTwoValuesToLocalStorage(formValue);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValue.email.length === 0 ||
      formValue.phoneNumber.length === 0 ||
      formValue.password.length === 0 ||
      formValue.confirmPassword.length === 0
    );
  };
  const disabledValue = shouldDisableButton();

  return (
    <div className="step">
      <div className="enable">
        <div className="formContainer">
          <div className="container">
            <div className="formHeader">
              <img className="main1" src="./image/logo.png" />
              <div className="formtitle1">Join Us! 😎</div>
              <div className="formTitle2">
                Please provide all current information accurately.
              </div>
            </div>
            <div className="formContainer2">
              <FormInput
                inputTag={`Email`}
                placeholder={`Your email`}
                handleChange={handleInputChange}
                name={`email`}
                value={formValue.email}
                error={errorState.email}
                errorMessage={`Мэйл хаягаа оруулна `}
              />
              <FormInput
                inputTag={`Phone Number`}
                placeholder={`Your phone number`}
                handleChange={handleInputChange}
                name={`phoneNumber`}
                value={formValue.phoneNumber}
                error={errorState.phoneNumber}
                errorMessage={`Утасны дугаараа оруулна уу.`}
              />
              <div className="textFeild" style={{ position: "relative" }}>
                <FormInput
                  inputTag={`Password`}
                  placeholder={`Your password`}
                  handleChange={handleInputChange}
                  name={`password`}
                  value={formValue.password}
                  error={errorState.password}
                  errorMessage={`Нууц үгээ оруулна уу`}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="eyeBtn"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div className="textFeild" style={{ position: "relative" }}>
                <FormInput
                  inputTag={`Confirm Password`}
                  placeholder={`Your confirm password`}
                  handleChange={handleInputChange}
                  name={`confirmPassword`}
                  value={formValue.confirmPassword}
                  error={errorState.confirmPassword}
                  errorMessage={`Нууц үгээ давтаж оруулна уу`}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="eyeBtn"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>{" "}
          <div className="btnContainer">
            <button className="back" onClick={handleBackStep}>
              <div className="sum">
                <img className="vector har" src="./image/zuun.png" />
              </div>{" "}
              <p className="lab3">Back</p>
            </button>
            <button
              className="continueBtn2"
              disabled={disabledValue}
              onClick={handleButtonClick}
            >
              <p className="lab">Continue</p>
              <div className="frame">
                <p className="lab1">2</p>
                <p className="lab4">/3</p>
              </div>
              <div className="sum">
                <img className="vector" src="./image/Vector.png" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
