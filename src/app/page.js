import Image from "next/image";
import "./pro.css";

export default function Home() {
  return (
    <div className="bdy">
      <div className="enable">
        {" "}
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
              <div className="textFeild">
                <span className="label">First name *</span>
                <input
                  className="inputContainer"
                  placeholder="Your first name"
                ></input>
              </div>
              <div className="textFeild">
                <span className="label">Last name *</span>
                <input
                  className="inputContainer"
                  placeholder="Your last name"
                ></input>
              </div>
              <div className="textFeild">
                <span className="label">Username *</span>
                <input
                  className="inputContainer"
                  placeholder="Your username"
                ></input>
              </div>
            </div>
          </div>
          <div className="btnContainer">
            <button className="continueBtn">
              <p className="lab">Continue</p>
              <p className="lab1">1</p>
              <p className="lab2">/3</p>
              <img className="vector" src="./image/Vector.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
