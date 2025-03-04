import React from 'react';
import BlogsData from "../../data/blogs.json"; // Importing the data
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 2 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5 }, // Staggered animation
  },
};

// Define the types for the blog data
interface Blog {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
}

const Blogs: React.FC = () => {
  return (
    <section className="section bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold">Latest Blogs</h2>
        <p className="text-gray-600">Read our latest blogs to stay updated with the latest fashion trends and news.</p>
      </div>
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.2}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[70rem] mx-auto">
        {/* Iterate through the blogs data */}
        {BlogsData.map((blog: Blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className="block hover:shadow-lg transition-shadow duration-300">
            <motion.article variants={textVariants} className="bg-white rounded-lg overflow-hidden shadow-sm">
              {/* Blog Image */}
              <div className="img h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Blog Description */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.subtitle}</p>
                <p className="text-xs text-gray-400 mt-2">{blog.date}</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default Blogs;
