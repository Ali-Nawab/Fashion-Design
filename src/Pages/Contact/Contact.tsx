import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useForm as useHookForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useForm, ValidationError } from "@formspree/react";

const Contact: React.FC = () => {
  // Yup schema for validation
  const schema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    LastName: yup.string().required("Last Name is required"),
    PhoneNo: yup
      .number()
      .typeError("Phone No must be a number")
      .required("Phone No is required"),
    Email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    Message: yup.string().required("Message is required"),
  });

  // Using react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useHookForm({
    resolver: yupResolver(schema),
  });

  // Formspree form setup
  const [state, handleSubmitFormspree] = useForm("xpwaerog");

  // On form submit, validate first and then submit to Formspree
  const onSubmit = async (data: any) => {
    await handleSubmitFormspree(data);
  };

  if (state.succeeded) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#eee]">
        <p className="text-2xl font-bold text-red-500">
          Thanks for getting in touch!
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#eee] py-8 overflow-x-hidden">
      <div className="mb-5 text-center md:section-title mt-8">
        <h2 className="font-bold text-red-500 text-[35px] md:text-[48px]">
          Get in Touch
        </h2>
      </div>
      <div className="section-center max-w-[1200px] mx-auto px-4">
        <p className="font-medium text-center leading-7 text-lg text-[#555] mt-4">
          In the case of any kind of query, you can contact us freely. We will
          be happy to entertain you.
        </p>
        <div className="py-8 grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                type="text"
                className="control-form"
                placeholder="First Name"
                {...register("FirstName")}
                error={!!errors.FirstName}
                helperText={errors.FirstName?.message}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                type="text"
                className="control-form"
                placeholder="Last Name"
                {...register("LastName")}
                error={!!errors.LastName}
                helperText={errors.LastName?.message}
              />
              <TextField
                label="Phone No."
                fullWidth
                variant="outlined"
                type="tel"
                className="control-form"
                placeholder="Phone No."
                {...register("PhoneNo")}
                error={!!errors.PhoneNo}
                helperText={errors.PhoneNo?.message}
              />
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                className="control-form"
                placeholder="Email"
                {...register("Email")}
                error={!!errors.Email}
                helperText={errors.Email?.message}
              />
              <TextField
                label="Message"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                className="control-form"
                placeholder="Enter your message"
                {...register("Message")}
                error={!!errors.Message}
                helperText={errors.Message?.message}
              />
              <button
                className="w-full bg-red-500 text-white py-3 rounded-lg text-xl hover:bg-red-600 transition-colors"
                type="submit"
                disabled={state.submitting}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div className="text-xl font-medium">
                <p>
                  <FaMapMarkerAlt className="inline mr-2 text-red-500" />
                  1st Floor, Al-Madina Plaza, Anwar Chowk, Wah Cantt, Pakistan
                </p>
              </div>
              <div className="text-xl font-medium">
                <p>
                  <FaPhoneAlt className="inline mr-2 text-red-500" />
                  +92 300 0000000
                </p>
              </div>
              <div className="text-xl font-medium">
                <p>
                  <FaEnvelope className="inline mr-2 text-red-500" />
                  alinawabkhan15@gmail.com
                </p>
              </div>
              <div className="text-xl">
                <p className="font-bold mb-2">Get Social:</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-2xl text-red-500 hover:text-red-600">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-2xl text-red-500 hover:text-red-600">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-2xl text-red-500 hover:text-red-600">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-2xl text-red-500 hover:text-red-600">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="text-2xl text-red-500 hover:text-red-600">
                    <FaYoutube />
                  </a>
                </div>
              </div>
              <div className="text-xl">
                <p className="font-bold mb-2">Subscribe:</p>
                <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    className="control-form"
                    placeholder="Enter Email"
                  />
                  <button className="bg-red-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-red-600 transition-colors">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;