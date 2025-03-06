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
interface FormData {
  FirstName: string;
  LastName: string;
  PhoneNo: number;
  Email: string;
  Message: string;
}
import { useForm as useHookForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import { useForm } from "@formspree/react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const schema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    LastName: yup.string().required("Last Name is required"),
    PhoneNo: yup
      .number()
      .typeError("Phone No must be a number")
      .required("Phone No is required"),
    Email: yup.string().email("Must be a valid email").required("Email is required"),
    Message: yup.string().required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useHookForm({ resolver: yupResolver(schema) });

  const [state, handleSubmitFormspree] = useForm("xpwaerog");
  const onSubmit = async (data: FormData) => {
    await handleSubmitFormspree({ ...data });
  };

  if (state.succeeded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.p className="text-2xl font-bold text-red-500" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Thanks for getting in touch!
        </motion.p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-12 overflow-hidden">
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl font-bold text-red-500">Get in Touch</h2>
      </motion.div>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <motion.div className="bg-white p-8 rounded-lg shadow-lg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField label="First Name" fullWidth variant="outlined" {...register("FirstName")} error={!!errors.FirstName} helperText={errors.FirstName?.message} />
            <TextField label="Last Name" fullWidth variant="outlined" {...register("LastName")} error={!!errors.LastName} helperText={errors.LastName?.message} />
            <TextField label="Phone No." fullWidth variant="outlined" {...register("PhoneNo")} error={!!errors.PhoneNo} helperText={errors.PhoneNo?.message} />
            <TextField label="Email" fullWidth variant="outlined" {...register("Email")} error={!!errors.Email} helperText={errors.Email?.message} />
            <TextField label="Message" fullWidth multiline rows={4} variant="outlined" {...register("Message")} error={!!errors.Message} helperText={errors.Message?.message} />
            <motion.button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg hover:bg-red-600 transition transform hover:scale-105" type="submit" disabled={state.submitting} whileHover={{ scale: 1.05 }}>
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div className="bg-white p-8 rounded-lg shadow-lg space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <p className="text-lg"><FaMapMarkerAlt className="inline mr-2 text-red-500" /> 1st Floor, Al-Madina Plaza, Wah Cantt, Pakistan</p>
          <p className="text-lg"><FaPhoneAlt className="inline mr-2 text-red-500" /> +92 300 0000000</p>
          <p className="text-lg"><FaEnvelope className="inline mr-2 text-red-500" /> alinawabkhan15@gmail.com</p>
          <div>
            <p className="font-bold mb-2">Get Social:</p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
                <motion.a key={index} href="#" className="text-2xl text-red-500 hover:text-red-600" whileHover={{ scale: 1.2 }}>
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold mb-2">Subscribe:</p>
            <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <TextField label="Email" fullWidth type="email" placeholder="Enter Email" />
              <motion.button className="bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition transform hover:scale-105" whileHover={{ scale: 1.05 }}>
                Submit
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
