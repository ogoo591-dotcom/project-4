"use client";

import { FormInput } from "../_components/form-input";
import { useState } from "react";

const addStepOneValuesToLocalStorage = (value) => {
  localStorage.setItem(`stepOne`, JSON.stringify(value));
};
export const StepOne = (props) => {
  const { handleNextStep } = props;

  const getStepOneValuesFromLocalStorage = () => {
    const value = localStorage.getItem(`stepOne`);
    if (value) {
      return JSON.parse(value);
    } else {
      return {
        firstName: "",
        lastName: "",
        userName: "",
      };
    }
  };
  const [formValue, setFormValue] = useState(
    getStepOneValuesFromLocalStorage()
  );

  const [errorState, setErrorState] = useState({});

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValue({ ...formValue, [inputName]: [inputValue] });
  };

  const validateInput = () => {
    const errors = {};
    if (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(formValue.firstName) ||
      /\d/.test(formValue.firstName)
    ) {
      errors.firstName = " Input should have only letters";
    }
    if (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(formValue.lastName) ||
      /\d/.test(formValue.lastName)
    ) {
      errors.lastName = " Last name input should have only letters";
    }
    if (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(formValue.userName) ||
      /\d/.test(formValue.userName)
    ) {
      errors.userName = " Use name input should have only letters";
    }
    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneValuesToLocalStorage(formValue);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisableButton = () => {
    return (
      formValue.firstName.length === 0 ||
      formValue.lastName.length === 0 ||
      formValue.userName.length === 0
    );
  };
  const disabledValue = shouldDisableButton();

  return (
    <div className="step">
      <div className="enable">
        <div className="formContainer">
          <div className="container">
            <div className="formHeader">
              <img className="main1" src="./image/logo.png" alt="logo" />
              <div className="formtitle1">Join Us! 😎</div>
              <div className="formTitle2">
                Please provide all current information accurately.
              </div>
            </div>
            <div className="formContainer2">
              <FormInput
                inputTag={`First Name`}
                placeholder={`Your first name`}
                handleChange={handleInputChange}
                name={`firstName`}
                value={formValue.firstName}
                error={errorState.firstName}
                errorMessage={`Нэрээ оруулна уу`}
              />
              <FormInput
                inputTag={`Last Name`}
                placeholder={`Your last name`}
                handleChange={handleInputChange}
                name={`lastName`}
                value={formValue.lastName}
                error={errorState.lastName}
                errorMessage={`Овгоо оруулна уу.`}
              />
              <FormInput
                inputTag={`User Name`}
                placeholder={`Your user name`}
                handleChange={handleInputChange}
                name={`userName`}
                value={formValue.userName}
                error={errorState.userName}
                errorMessage={`Хэрэглэгчийн нэрээ оруулна уу`}
              />
            </div>
          </div>
          <div className="btnContainer">
            <button
              disabled={disabledValue}
              onClick={handleButtonClick}
              className="continueBtn"
            >
              <p className="lab">Continue</p>
              <div className="frame">
                <p className="lab1">1</p>
                <p className="lab2">/3</p>
              </div>
              <div className="sum">
                <img className="vector" src="./image/Vector.png" alt="sum" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
