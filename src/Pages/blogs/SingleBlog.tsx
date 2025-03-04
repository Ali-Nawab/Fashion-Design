import React from "react";
import { useParams } from "react-router-dom";
import BlogsData from "../../data/blogs.json"; // Import the blog data

interface Blog {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  description: string;
}

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the URL
  const blogId = id ? parseInt(id) : null; // Convert the ID to a number
  const blog = BlogsData.find((blog: Blog) => blog.id === blogId); // Find the blog by ID

  if (!blog) {
    return <div className="text-center text-2xl font-bold mt-10">Blog not found!</div>;
  }

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-[70rem] mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Blog Image */}
          <div className="h-96 overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Blog Details */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{blog.subtitle}</p>
            <p className="text-sm text-gray-400 mb-6">{blog.date}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{blog.description}</p>
          </div>
        </div>
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

export default SingleBlog;