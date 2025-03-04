import React, { useState } from "react";
import { Avatar, IconButton, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apis from "../../utils/apis";
import Spinner from "./Spinner";

// Zod Schema for Form Validation
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    cnic: z.string().min(13, "CNIC must be 13 digits"),
    postalAddress: z.string().min(1, "Postal Address is required"),
    permanentAddress: z.string().min(1, "Permanent Address is required"),
    country: z.string().min(1, "Country is required"),
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const formData = new FormData();

      // Append all form fields to FormData
      (Object.keys(data) as (keyof RegisterSchemaType)[]).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Append the image file if it exists
      if (imageFile) {
        formData.append("image", imageFile);
      }

      toast.dismiss();
      setLoading(true);

      // Send the FormData
      const response = await fetch(apis().register, {
        method: "POST",
        body: formData, // No need to set Content-Type header, fetch will handle it
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(result?.message || "An unknown error occurred");
      }

      if (result?.status) {
        toast.success(result?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error((error as Error)?.message);
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="grid min-h-screen">
      <div className="relative">
        <div className="bg-gray-300 p-4" style={{ height: "7rem" }}></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[70rem] mx-auto"
        >
          <div className="absolute top-12 left-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="avatar-input"
              style={{ display: "none" }}
            />
            <IconButton component="label" htmlFor="avatar-input">
              <Avatar
                src={preview || "https://via.placeholder.com/150"}
                sx={{ width: 100, height: 100, cursor: "pointer" }}
              />
            </IconButton>
          </div>
          <div className="mt-20 px-8 grid gap-4 w-full place-items-center">
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
            <TextField
              label="CNIC"
              type="text"
              variant="outlined"
              fullWidth
              {...register("cnic")}
              error={!!errors.cnic}
              helperText={errors.cnic?.message}
            />
            <TextField
              label="Postal Address"
              type="text"
              variant="outlined"
              fullWidth
              {...register("postalAddress")}
              error={!!errors.postalAddress}
              helperText={errors.postalAddress?.message}
            />
            <TextField
              label="Permanent Address"
              type="text"
              variant="outlined"
              fullWidth
              {...register("permanentAddress")}
              error={!!errors.permanentAddress}
              helperText={errors.permanentAddress?.message}
            />
            <TextField
              label="Country"
              type="text"
              variant="outlined"
              fullWidth
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
            <TextField
              label="Province"
              type="text"
              variant="outlined"
              fullWidth
              {...register("province")}
              error={!!errors.province}
              helperText={errors.province?.message}
            />
            <TextField
              label="City"
              type="text"
              variant="outlined"
              fullWidth
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
            <TextField
              label="Zip Code"
              type="text"
              variant="outlined"
              fullWidth
              {...register("zipCode")}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </div>
          <div className="my-5 text-center">
            {!loading ? (
              <Button type="submit" variant="contained" className="mt-6 w-40">
                Register
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                className="mt-6 w-40 flex items-center justify-center"
              >
                <span className="mr-2">Please Wait...</span> <Spinner />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;