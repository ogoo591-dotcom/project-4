"use client";

import "./pro.css";
import { useState } from "react";
import { StepOne } from "./_features/StepOne";
import { StepTwo } from "./_features/StepTwo";
import { StepThree } from "./_features/StepThree";
import { StepFour } from "./_features/StepFour";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((s) => Math.min(4, s + 1));
  const handleBackStep = () => setStep((s) => Math.max(1, s - 1));
  const handleFinish = () => setStep(4);

  return (
    <>
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}
      {step === 2 && (
        <StepTwo
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
      )}
      {step === 3 && (
        <StepThree
          handleNextStep={handleFinish}
          handleBackStep={handleBackStep}
        />
      )}
      {step === 4 && <StepFour />}
    </>
  );
}
