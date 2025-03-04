import React, { useRef, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Timer from "./Timer";
import "./formanimation.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import Spinner from "./Spinner";

const VerifyOTP: React.FC = () => {
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);
  const ref6 = useRef<HTMLInputElement>(null);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const [otpTime, setOtpTime] = useState<number | null>(null)
  const [isExpire, setIsExpire] = useState(false)

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];
  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);

  const inputChange = (event: any, location: number) => {
    if (event.target.value) {
      otpArray[location](event.target.value); // Update the state for the current input
      if (location < 5) {
        inputRef[location + 1].current?.focus(); // Move to the next input if not the last one
      }
    }
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    toast.dismiss();
    const finalOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    try {
      setLoading(true);
      const response = await fetch(apis().verifyOtp, {
        method: "POST",
        body: JSON.stringify({ otp: finalOTP }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      setLoading(false);

      if (!response.ok) {
        return toast.error(result.message);
      }

      if (result.status) {
        toast.success(result.message);
        navigate("/password/update");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchOtpTime = async () => {
      try {
        const response = await fetch(apis().getOtpTime, {
          method: "POST",
          body: JSON.stringify({token: localStorage.getItem("pass-token")}),
          headers: {
            "Content-Type": "application/json", // ✅ Ensure correct headers
          },
        });
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
        }
        if (result.status) {
          //toast.success(result.mnullessage);
          const remainingTime = new Date(result.sendTime).getTime() - new Date().getTime()

          if(remainingTime > 0 ){
            setOtpTime(remainingTime)
          } else {
            setIsExpire(true)
          }
          
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.log(error.message)
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };

    fetchOtpTime();
  }, []);

  const goToLogin = () => {
    navigate("/login")
  }

  const resendHandler = async () => {
    try {
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({email: localStorage.getItem("email")}),
        headers: { 'Content-Type': 'application/json'}
      })

      const result = await response.json()

      if(!response.ok){
        throw new Error()
      }

      if(result.status){
        toast.success(result.message)
        localStorage.setItem("pass-token", result.token)
        setOtpTime(1*60*1000)
        setIsExpire(false)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 bg-opacity-90 backdrop-blur-md flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[450px] p-8 animate-slideIn">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="text-gray-600 text-center text-sm mt-2">
            Enter the 6-digit OTP we just sent to your email
          </p>
        </div>

        <form onSubmit={submitHandler} className="my-6">
          <label className="block text-gray-700 font-medium mb-2">OTP *</label>
          <div className="flex justify-center gap-3">
            {inputRef.map((item, index) => (
              <input
                ref={item}
                onChange={(event) => {
                  if (!/^\d?$/.test(event.target.value)) {
                    event.target.value = ""; // Clear input if non-numeric or multiple characters are entered
                  }
                  inputChange(event, index);
                }}
                key={index}
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                className="border-2 border-gray-300 rounded-xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300 transform hover:scale-105"
                style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            {!loading ? (
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                Verify OTP
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                Please Wait....
                <Spinner />
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 flex justify-center text-gray-600">
          { otpTime != null && !isExpire ? <Timer setIsExpire={setIsExpire} time={otpTime}/> : <span className="text-blue-500 font-medium" onClick={resendHandler}>Resend</span>}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outlined"
            className="border-2 border-gray-500 text-gray-700 px-5 py-2 rounded-lg transition duration-300 hover:bg-gray-200"
            onClick = {goToLogin}
          >
            <i className="ri-arrow-left-line"></i> Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
