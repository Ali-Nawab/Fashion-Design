import React from 'react';
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
})

const cards = [
    {
        id: 1,
        image: card1,
        trend: "2024 Trend",
        title: "Women's Shirt"
    },
    {
        id: 2,
        image: card2,
        trend: "2024 Trend",
        title: "Women's Dresses"
    },
    {
        id: 3,
        image: card3,
        trend: "2024 Trend",
        title: "Women's Casuals"
    }
];

const HeroSection: React.FC = () => {
  
  return (
    <div className="section flex justify-center items-center mb-10">
      <div className="flex gap-4 flex-wrap items-center justify-center ls:justify-between">
        {cards.map((card, index) => (
          <div
          data-aos="fade-right" data-aos-duration="2000" data-aos-delay={index * 150}
            key={card.id}
            className="px-4 flex flex-col items-center text-gray-700 transform hover:scale-110 transition duration-300 md:flex-[0_1_calc(50%-1rem)] lg:flex-[0_1_calc(33.3333%-1rem)] cursor-pointer"
          >
            {/* Adjust Image Classes */}
            <img
              src={card.image}
              alt={card.title}
              className="max-w-sm xl:max-w-[360px] w-full object-contain relative rounded-xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
