"use client";

import { FormInput } from "../_components/form-input";
import { useEffect, useState } from "react";

export const StepOne = (props) => {
  const { handleNextStep } = props;

  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });

  const [errorState, setErrorState] = useState({});

  useEffect(() => {
    try {
      const value = localStorage.getItem("stepOne");
      if (value) {
        setFormValue(JSON.parse(value));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("stepOne", JSON.stringify(formValue));
    } catch {}
  }, [formValue]);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValue({ ...formValue, [inputName]: inputValue });
  };

  const validateInput = () => {
    const errors = {};
    const onlyLetters = /^[\p{L}\s'-]+$/u;

    if (!formValue.firstName.trim()) {
      errors.firstName = "Нэрээ оруулна уу";
    } else if (!onlyLetters.test(formValue.firstName)) {
      errors.firstName = "Нэр зөвхөн үсгээр байх ёстой";
    }

    if (!formValue.lastName.trim()) {
      errors.lastName = "Овгоо оруулна уу";
    } else if (!onlyLetters.test(formValue.lastName)) {
      errors.lastName = "Овог зөвхөн үсгээр байх ёстой";
    }

    if (!formValue.userName.trim()) {
      errors.userName = "Хэрэглэгчийн нэрээ оруулна уу";
    } else if (!onlyLetters.test(formValue.userName)) {
      errors.userName = "Хэрэглэгчийн нэр зөвхөн үсгээр байх ёстой";
    }

    return errors;
  };
  const handleButtonClick = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabledValue = false;

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
                inputTag="First Name"
                placeholder="Your first name"
                handleChange={handleInputChange}
                name="firstName"
                value={formValue.firstName}
                error={Boolean(errorState.firstName)}
                errorMessage={errorState.firstName}
              />
              <FormInput
                inputTag="Last Name"
                placeholder="Your last name"
                handleChange={handleInputChange}
                name="lastName"
                value={formValue.lastName}
                error={Boolean(errorState.lastName)}
                errorMessage={errorState.lastName}
              />
              <FormInput
                inputTag="User Name"
                placeholder="Your user name"
                handleChange={handleInputChange}
                name="userName"
                value={formValue.userName}
                error={Boolean(errorState.userName)}
                errorMessage={errorState.userName}
              />
            </div>
          </div>
          <div className="btnContainer">
            <button
              disabled={disabledValue}
              onClick={handleButtonClick}
              className="continueBtn"
              type="button"
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
