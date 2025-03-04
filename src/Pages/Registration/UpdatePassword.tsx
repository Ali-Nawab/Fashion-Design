import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import apis from "../../utils/apis"

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    toast.dismiss()

    console.log(data)
    console.log(localStorage.getItem("pass-token"))

    try{
      const response = await fetch(apis().updatePassword, {
        method: 'POST',
        body: JSON.stringify({ password: data.password, confirmPassword: data.confirmPassword, token: localStorage.getItem("pass-token")}),
        headers: { 'Content-Type': "application/json"}
      })

      const result = await response.json()

      if(!response.ok) {
        toast.error(result.message)
      }

      if(result.status){
        toast.success(result.message)
        localStorage.removeItem("email")
        localStorage.removeItem("pass-token")
        navigate('/login')
      }
    } catch (error) {
      if (error instanceof Error) {
              toast.error(error.message);
            } else {
              toast.error("An unknown error occurred");
            }
    }

  };

  const navigate = useNavigate()

  const NavigateToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 bg-opacity-90 backdrop-blur-md flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[450px] p-8 animate-slideIn">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Update Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            {...register("password")}
            type="password"
            variant="outlined"
            label="Enter password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register("confirmPassword")}
            type="password"
            variant="outlined"
            label="Confirm password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <div className="text-center">
            <Button type="submit" variant="contained">
              Update Password
            </Button>
          </div>
          <div className="text-center">
            <Button variant="outlined" onClick={NavigateToLogin}>Back to Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
