"use client";

import { useEffect, useState } from "react";

const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

export const StepThree = ({ handleNextStep, handleBackStep }) => {
  const [formValue, setFormValue] = useState({
    date: "",
    profileDataUrl: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [errorState, setErrorState] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("stepThree");
      if (raw) {
        const saved = JSON.parse(raw);
        setFormValue(saved);
        if (saved.profileDataUrl) setImgUrl(saved.profileDataUrl);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("stepThree", JSON.stringify(formValue));
    } catch {}
  }, [formValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    setErrorState((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImgUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type?.startsWith("image/")) {
      setErrorState((prev) => ({
        ...prev,
        file: "Зөвхөн зураг файл оруулна уу",
      }));
      return;
    }
    const dataUrl = await fileToDataURL(file);
    setProfileFile(file);
    setImgUrl(dataUrl);
    setFormValue((prev) => ({ ...prev, profileDataUrl: dataUrl }));
    setErrorState((prev) => ({ ...prev, file: undefined }));
  };

  const validateInput = () => {
    const errors = {};
    if (!formValue.date) {
      errors.date = "Төрсөн өдрөө оруулна уу";
    } else {
      const today = new Date();
      const hbday = new Date(formValue.date + "T00:00:00");
      if (isNaN(hbday.getTime())) {
        errors.date = "Огноо буруу байна";
      } else {
        let age = today.getFullYear() - hbday.getFullYear();
        const m = today.getMonth() - hbday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < hbday.getDate())) age--;
        if (age < 18) errors.date = "18 наснаас дээш байх шаардлагатай";
      }
    }
    if (!profileFile && !formValue.profileDataUrl) {
      errors.file = "Профайл зурагаа оруулна уу";
    }
    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      handleNextStep && handleNextStep({});
    } else {
      setErrorState(errors);
    }
  };
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
              <div className="textFeild">
                <span className="label">
                  Date of birth <span className="od">*</span>
                </span>
                <div
                  className={`inputWrapper ${errorState.date ? "error" : ""}`}
                >
                  <input
                    type="date"
                    name="date"
                    value={formValue.date}
                    onChange={handleInputChange}
                    className="inputContainer dateInput"
                  />
                </div>
                {errorState.date && <p className="red">{errorState.date}</p>}
              </div>
              <label>
                <span className="label zai">
                  Profile image <span className="od">*</span>
                </span>
                <div
                  className={`imageUpload ${errorState.file ? "error" : ""}`}
                >
                  {imgUrl ? (
                    <img src={imgUrl} className="UploadImage" alt="preview" />
                  ) : (
                    <div className="imageBtn">
                      <img
                        src="./image/Upload-Icon.png"
                        className="uploadIcon"
                        alt="icon"
                      />
                      <p className="imageText">Browse or Drop Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hiddenFile"
                    onChange={handleImgUpload}
                  />
                </div>
                {errorState.file && <p className="red">{errorState.file}</p>}
              </label>
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
              type="button"
              onClick={handleButtonClick}
            >
              <p className="lab">Continue</p>
              <div className="frame">
                <p className="lab1">3</p>
                <p className="lab4">/3</p>
              </div>
              <div className="sum" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
