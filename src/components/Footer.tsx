import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import insta1 from "../assets/instagram-1.jpg";
import insta2 from "../assets/instagram-2.jpg";
import insta3 from "../assets/instagram-3.jpg";
import insta4 from "../assets/instagram-4.jpg";
import insta5 from "../assets/instagram-5.jpg";
import insta6 from "../assets/instagram-6.jpg";

const Footer: React.FC = () => {
  const location = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Info */}
        <article>
          <h3 className="font-bold text-white mb-4">CONTACT INFO</h3>
          <div className="space-y-2">
            <p>
              <span className="text-red-500"><i className="ri-map-pin-2-fill"></i></span> 123, London Bridge Street, London
            </p>
            <p>
              <span className="text-red-500"><i className="ri-mail-fill"></i></span> support@lebaba.com
            </p>
            <p>
              <span className="text-red-500"><i className="ri-phone-fill"></i></span> (+012) 3456 789
            </p>
          </div>
        </article>

        {/* Company Links */}
        <article>
          <h3 className="font-bold text-white mb-4">COMPANY</h3>
          <div className="space-y-2 flex flex-col gap-2">
            <Link to="/"><span className="hover:text-red-500">Home</span></Link>
            <Link to="/About"><span className="hover:text-red-500">About Us</span></Link>
            <Link to="/work"><span className="hover:text-red-500">Work With Us</span></Link>
            <Link to="/blogs"><span className="hover:text-red-500">Our Blog</span></Link>
            <Link to="/terms&conditions"><span className="hover:text-red-500">Terms & Conditions</span></Link>
          </div>
        </article>

        {/* Useful Links */}
        <article>
          <h3 className="font-bold text-white mb-4">USEFUL LINK</h3>
          <div className="space-y-2 flex flex-col gap-2">
            <Link to="/help"><span className="hover:text-red-500">Help</span></Link>
            <Link to="/trackOrder"><span className="hover:text-red-500">Track My Order</span></Link>
            <Link to="/men"><span className="hover:text-red-500">Men</span></Link>
            <Link to="/women"><span className="hover:text-red-500">Women</span></Link>
            <Link to="/dresses"><span className="hover:text-red-500">Dresses</span></Link>
          </div>
        </article>

        {/* Instagram Section */}
        <article>
          <h3 className="font-bold text-white mb-4">INSTAGRAM</h3>
          <div className="grid grid-cols-3 gap-2">
            <img src={insta1} alt="Instagram 1" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300" />
            <img src={insta2} alt="Instagram 2" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300" />
            <img src={insta3} alt="Instagram 3" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300"/>
            <img src={insta4} alt="Instagram 4" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300" />
            <img src={insta5} alt="Instagram 5" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300" />
            <img src={insta6} alt="Instagram 6" className="w-full h-20 object-cover rounded-md cursor-pointer transform hover:scale-110 transition-all duration-300" />
          </div>
        </article>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">© 2025 Lebaba. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;