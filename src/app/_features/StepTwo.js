"use client";

import { useEffect, useState } from "react";
import { FormInput } from "../_components/form-input";

export const StepTwo = (props) => {
  const { handleNextStep, handleBackStep } = props;

  const [formValue, setFormValue] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorState, setErrorState] = useState({});

  useEffect(() => {
    try {
      const value = localStorage.getItem("stepTwo");
      if (value) {
        setFormValue(JSON.parse(value));
      }
    } catch (err) {
      console.error("localStorage read error:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("stepTwo", JSON.stringify(formValue));
    } catch (err) {
      console.error("localStorage read error:", err);
    }
  }, [formValue]);

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
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const disabledValue =
    !formValue.email ||
    !formValue.phoneNumber ||
    !formValue.password ||
    !formValue.confirmPassword;

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
                inputTag="Email"
                placeholder="Your email"
                handleChange={handleInputChange}
                name="email"
                value={formValue.email}
                error={errorState.email}
                errorMessage="Мэйл хаягаа оруулна "
              />

              <FormInput
                inputTag="Phone Number"
                placeholder="Your phone number"
                handleChange={handleInputChange}
                name="phoneNumber"
                value={formValue.phoneNumber}
                error={errorState.phoneNumber}
                errorMessage="Утасны дугаараа оруулна уу."
              />

              <div className="textFeild" style={{ position: "relative" }}>
                <FormInput
                  inputTag="Password"
                  placeholder="Your password"
                  handleChange={handleInputChange}
                  name="password"
                  value={formValue.password}
                  error={errorState.password}
                  errorMessage="Нууц үгээ оруулна уу"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="eyeBtn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              <div className="textFeild" style={{ position: "relative" }}>
                <FormInput
                  inputTag="Confirm Password"
                  placeholder="Your confirm password"
                  handleChange={handleInputChange}
                  name="confirmPassword"
                  value={formValue.confirmPassword}
                  error={errorState.confirmPassword}
                  errorMessage="Нууц үгээ давтаж оруулна уу"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="eyeBtn"
                  aria-label="Toggle confirm-password visibility"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button className="back" type="button" onClick={handleBackStep}>
              <div className="sum">
                <img className="vector har" src="./image/zuun.png" alt="sum" />
              </div>
              <p className="lab3">Back</p>
            </button>

            <button
              className="continueBtn2"
              disabled={disabledValue}
              onClick={handleButtonClick}
              type="button"
            >
              <p className="lab">Continue</p>
              <div className="frame">
                <p className="lab1">2</p>
                <p className="lab4">/3</p>
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
