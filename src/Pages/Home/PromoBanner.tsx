import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5 }, // Staggered animation
  },
};

const PromoBanner: React.FC = () => {
  return (
    <div className="section flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
        className="flex flex-col md:flex-wrap gap-8 justify-center items-center md:flex-row md:gap-6 max-w-[70rem] w-full"
      >
        {/* Article 1 */}
        <motion.article
          variants={textVariants}
          className="flex flex-col items-center text-center gap-2 bg-gray-50 p-6 rounded-md shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
        >
          <span className="text-blue-500 text-4xl">
            <i className="ri-truck-line"></i>
          </span>
          <p className="font-bold text-lg">Free Delivery</p>
          <p className="text-gray-600">
            Offers convenience and the ability to shop from anywhere, anytime
          </p>
        </motion.article>

        {/* Article 2 */}
        <motion.article
          variants={textVariants}
          className="flex flex-col items-center text-center gap-2 bg-gray-50 p-6 rounded-md shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
        >
          <span className="text-green-500 text-4xl">
            <i className="ri-money-dollar-circle-line"></i>
          </span>
          <p className="font-bold text-lg">Secure Payments</p>
          <p className="text-gray-600">
            Enjoy hassle-free and secure payment options for all your orders
          </p>
        </motion.article>

        {/* Article 3 */}
        <motion.article
          variants={textVariants}
          className="flex flex-col items-center text-center gap-2 bg-gray-50 p-6 rounded-md shadow-lg w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
        >
          <span className="text-red-500 text-4xl">
            <i className="ri-user-voice-fill"></i>
          </span>
          <p className="font-bold text-lg">Customer Support</p>
          <p className="text-gray-600">
            We're here to help 24/7 with any queries or concerns
          </p>
        </motion.article>
      </motion.div>
    </div>
  );
};

export default PromoBanner;
