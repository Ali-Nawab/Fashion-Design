import React from "react";
import DealsImg from "../../assets/deals.png";
import { motion } from "framer-motion";

// Animation Variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

const fadeRightVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

const fadeLeftVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const DealsSection: React.FC = () => {
  return (
    <section className="section py-15">
      <div className="section-center max-w-[70rem] mx-auto">
        <motion.article
          className="bg-primary-coloring flex flex-col justify-center gap-8 p-8 md:justify-between md:flex-row rounded-xl"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Image Section */}
          <motion.div
            className="img flex-[1_1_60%] flex justify-center items-center"
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={DealsImg}
              alt="Deals Image"
              className="w-full max-w-[30rem] md:max-w-[40rem] object-contain"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="content text-center self-center flex-[1_1_40%] mt-4 md:mt-0"
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p className="font-bold">Get Up to 20% Discount</motion.p>
            <motion.h2 className="font-bold lg:text-4xl">Deals Of This Month</motion.h2>
            <motion.p>
              Our Women's Fashion Deals of the Month are here to make your style dreams 
              a reality without breaking the bank. Discover a curated collection of 
              exquisite clothing, accessories, and footwear, all handpicked to elevate 
              your wardrobe.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              className="flex gap-4 flex-wrap justify-center text-gray-500 font-medium"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["14 Days", "20 Hours", "15 Mins", "05 Secs"].map((time, index) => (
                <motion.article
                  key={index}
                  className="h-20 w-20 bg-white rounded-full flex flex-col items-center justify-center"
                  variants={fadeUpVariant}
                >
                  <span>{time.split(" ")[0]}</span>
                  <span>{time.split(" ")[1]}</span>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default DealsSection;
