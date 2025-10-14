"use client";

import Image from "next/image";

export const StepFour = () => {
  return (
    <div className="step">
      <div className="enable">
        <div className="formContainer3">
          <div className="container">
            <div className="formHeader">
              <Image
                className="main1"
                src="/image/logo.png"
                alt="logo"
                width={120}
                height={120}
                priority
              />
              <div className="formtitle1">You are All Set 🔥</div>
              <div className="formTitle2">
                We have received your submission. Thank you!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
