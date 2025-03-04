import React from 'react';
import aboutus from '../../assets/about us.jpg';
import { Button } from "@mui/material"

const About: React.FC = () => {
  return (
    <section className="section">
      <div className="p-4 w-[85vw] mx-auto mt-8">
        {/* Image Section */}
        <div className="relative h-[20rem] sm:h-[30vh] md:h-[40vh] lg:h-[50vh] rounded-lg overflow-hidden">
          <img
            src={aboutus}
            alt="about us image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Description Section */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Welcome to Glamour Haven</h2>
          <p className="text-gray-600">
            Welcome to <strong>Glamour Haven</strong>, your ultimate destination for girls' fashion! At Glamour Haven, we believe that every girl deserves to feel confident, stylish, and empowered. Our curated collection of trendy dresses, accessories, jewellery, and cosmetics is designed to help you express your unique personality and stay ahead in the fashion game.
          </p>
          <p className="text-gray-600 mt-4">
            Whether you're looking for the perfect outfit for a special occasion, everyday wear, or just want to treat yourself to something new, we’ve got you covered. From chic dresses that turn heads to elegant jewellery that adds a touch of sparkle, our products are carefully selected to bring out the best in you.
          </p>
          <p className="text-gray-600 mt-4">
            At Glamour Haven, we’re more than just a fashion store – we’re a community that celebrates individuality and self-expression. Join us on this stylish journey and discover the latest trends, exclusive deals, and fashion tips that will inspire you to shine every day.
          </p>
        </div>

        <div className="my-8 flex justify-center items-center gap-8 flex-col">
          <h2 className="font-bold">Ready to Start selling at Glamour Haven</h2>
          <Button variant='contained' color='success'>Appy Today</Button>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-green-800 rounded-lg">
          <article className="text-white p-6">
            <h3 className="text-xl font-semibold mb-4">Handpick Stores, Gifts & Items</h3>
            <p className="text-white">
              We strive to offer competitive gifts and products to our customers. To achieve this, we carefully handpick the stores we work with the products.
            </p>
          </article>
          <article className="text-white p-6">
            <h3 className="text-xl font-semibold mb-4">Free Worldwide Shipping</h3>
            <p className="text-white">
              Enjoy free shipping on all orders, no matter where you are in the world. We believe that great fashion should be accessible to everyone, everywhere.
            </p>
          </article>
          <article className="text-white p-6">
            <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
            <p className="text-white">
              Your security is our priority. We use the latest encryption technology to ensure that your payments are safe and secure. Shop with confidence!
            </p>
          </article>
          <article className="text-white p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Service</h3>
            <p className="text-white">
              We pride ourselves on our fast and efficient service. From order placement to delivery, we ensure a seamless shopping experience for our customers.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;