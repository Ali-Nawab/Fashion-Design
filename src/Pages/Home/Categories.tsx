import React from 'react';
import Category1 from "../../assets/category-1.jpg";
import Category2 from "../../assets/category-2.jpg";
import Category3 from "../../assets/category-3.jpg";
import Category4 from "../../assets/category-4.jpg";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init( { duration: 800, once: true, offset: 300} );

const Categories: React.FC = () => {
    const categories = [
        { name: 'Accessories', path: 'accessories', image: Category1 },
        { name: 'Dress Collection', path: 'dress', image: Category2 },
        { name: 'Jewellery', path: 'jewellery', image: Category3 },
        { name: 'Cosmetics', path: 'cosmetics', image: Category4 },
    ];

    return (
        <section className="section flex justify-center items-center mb-20">
            <div className="flex flex-wrap gap-10 md:gap-20 justify-center"  data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom">
                {categories.map((category, index) => (
                    <Link
                        to={`/categories/${category.path}`}
                        key={category.name}
                        className="flex flex-col items-center text-center text-gray-700 hover:text-red-500 transform hover:scale-110 transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                    >
                        <Avatar
                            alt={category.name}
                            src={category.image}
                            style={{
                                width: "150px", // Custom width
                                height: "150px", // Custom height
                                border: "4px solid #e5e7eb", // Light gray border
                                transition: "border-color 0.3s ease",
                            }}
                            className="hover:text-red-500"
                        />
                        <h3 className="mt-4 text-lg font-medium">{category.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
