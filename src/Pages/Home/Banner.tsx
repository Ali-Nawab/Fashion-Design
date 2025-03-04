import React from "react";
import bannerImg from "../../assets/header.png";
import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import "./Banner.css";

// Initialize AOS
AOS.init({ once: true});

// Framer Motion Animation Variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Banner Content
const slides = [
  {
    discount: "UP TO 20% Discount on",
    heading: "Girl's Fashion",
    text: "Discover the latest trends and express your unique style with our women's fashion collection. Find dresses, accessories, and footwear for every occasion.",
  },
  {
    discount: "Limited Offer: 30% Off",
    heading: "Exclusive Winter Collection",
    text: "Stay warm and stylish this season! Shop our exclusive winter collection with stunning jackets, boots, and cozy outfits.",
  },
  {
    discount: "Flash Sale: Buy 1 Get 1 Free",
    heading: "Trendy Accessories",
    text: "Enhance your look with our latest accessories! From elegant handbags to stunning jewelry, grab your favorites before the sale ends.",
  },
];

const Banner: React.FC = () => {
  return (
    <section className="py-8 flex place-items-center my-20">
      <div className="max-w-[1400px] mx-auto w-full">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper" slidesPerView={1}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <header className="section bg-primary-coloring rounded-xl">
                <div className="section-center sm:grid sm:grid-cols-2">
                  {/* Text Section with Framer Motion */}
                  <div className="description p-4 flex items-center justify-center self-center">
                    <div>
                      <motion.h4
                        className="font-semibold text-red-500 mb-4 text-[1.2rem]"
                        variants={fadeInVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {slide.discount}
                      </motion.h4>

                      <motion.h1
                        className="font-bold text-3xl mb-4 md:text-[2.5rem]"
                        variants={fadeInVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {slide.heading}
                      </motion.h1>

                      <motion.p
                        className="mb-4 text-gray-700"
                        variants={fadeInVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {slide.text}
                      </motion.p>

                      <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Button variant="contained" color="error">
                          Shop Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Image Section with AOS */}
                  <div
                    className="img sm:h-auto sm:static self-center"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <img
                      src={bannerImg}
                      alt="Banner"
                      className="w-full max-h-[800px] sm:max-h-[60vh] lg:max-h-[80vh] object-cover"
                    />
                  </div>
                </div>
              </header>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
