import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/operations/authApi";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/forgot-password");
    }
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp(location.state.email, otp, navigate))
    setOtp("");
  };

  return (
    <section className="h-full flex items-center justify-center bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-character OTP sent to your email address.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        
          <div className="flex flex-col items-center">
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum={false}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              inputStyle={{
                width: "3.5rem",
                height: "3rem",
                margin: "0 0.25rem",
                fontSize: "1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                background: "#f9fafb",
                color: "#111827",
                outline: "none",
                textAlign: "center",
                transition: "border-color 0.2s",
              }}
              focusStyle={{
                border: "2px solid #ef4444",
              }}
              containerStyle="justify-center"
              inputType="text"
              placeholder="------"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200 shadow-md"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyOtp;
