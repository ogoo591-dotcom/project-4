"use client";

import "./pro.css";
import { useState } from "react";
import { StepOne } from "./_features/StepOne";
import { StepTwo } from "./_features/StepTwo";
import { StepThree } from "./_features/StepThree";
import { StepFour } from "./_features/StepFour";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep(step + 1);
  const handleBackStep = () => setStep(step - 1);

  return (
    <>
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}

      {step === 2 && (
        <StepTwo
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}

      {step === 3 && (
        <StepThree
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}

      {step === 4 && <StepFour />}
    </>
  );
}
