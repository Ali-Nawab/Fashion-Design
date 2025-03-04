import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import Spinner from "./Spinner"

const StyledFormContainer = styled("div")({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "linear-gradient(to bottom right, #3b82f6, #4f46e5)",
  opacity: 0.9,
  backdropFilter: "blur(5px)",
});

const StyledForm = styled("form")({
  // ✅ Changed from <div> to <form>
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  width: "500px",
  padding: "24px",
  animation: "slideIn 0.3s ease-out",
  "@keyframes slideIn": {
    from: { transform: "translateY(-20px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

const StyledButton = styled(Button)({
  borderRadius: "8px",
  fontWeight: "bold",
  textTransform: "none",
  padding: "10px 20px",
  marginTop: "16px",
});

const forgetPasswordSchema = z.object({
  email: z.string().min(5, "Invalid Email Address"),
});

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  type forgetPasswordData = z.infer<typeof forgetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: forgetPasswordData) => {
    try {
      setLoading(true)
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setLoading(false)

      if (!response.ok) {
        toast.dismiss();
        toast.error(result.message);
      }

      if (result.status) {
        toast.dismiss();
        toast.success(result.message);
        localStorage.setItem("pass-token", result.token)
        localStorage.setItem("email", data.email)
        navigate("/verifyOTP")
      }

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error(error);
    }
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* ✅ Now handles form submission */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            Forget Password
          </h2>
          <p>Enter your Email Address so we can send a 6-digit OTP.</p>
        </div>
        <div style={{ marginTop: "24px" }}>
          <StyledTextField
            {...register("email")} // ✅ Corrected register usage
            variant="outlined"
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: "#666" } }}
          />
        </div>
        {
          !loading ? (
            <StyledButton
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#3b82f6", color: "#fff" }}
          type="submit"
        >
          Submit
        </StyledButton>
          ) : (
            <StyledButton
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#3b82f6", color: "#fff", display: "flex" }}
          type="submit"
        >
          <span>Please Wait...</span><Spinner />
        </StyledButton>
          )
        }
        <div className="mt-6 text-center">
          <Button
            variant="outlined"
            fullWidth
            onClick={navigateToLogin}
            className="border-2 border-gray-500 text-gray-700 px-5 py-2 rounded-lg transition duration-300 hover:bg-gray-200"
          >
            <i className="ri-arrow-left-line"></i> Back to Login
          </Button>
        </div>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ForgetPassword;
