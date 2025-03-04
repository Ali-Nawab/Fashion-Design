import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import CategoryProducts from '../Categories/CategoryProducts';
import apis from "../../utils/apis"

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  originalPrice: number;
  discountedPrice?: number;
  discountedPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  color: string;
  author: string;
  imageURL: string;
  
  subcategories: {
    size: string;
    price: number;
    stock: number;
  }[];

  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerId: string;
  }[];
}


const filters = {
  categories: ['all', 'Accessories', 'Clothing', 'Jewellery', 'Footwear'],
  colors: ['all', 'Black', 'Red', 'Gold', 'Blue', 'Green', 'Brown', 'Yellow'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: "50$ - 100$", min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity }
  ],
  ratings: [1, 2, 3, 4, 5]
};



const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterState, setFilterState] = useState({
    category: '',
    color: '',
    priceRange: '',
    rating: 0
  });

  useEffect(() => {
    // Fetch products from API
    const getProducts = async () => {
      try {
        const response = await fetch(apis().getProducts, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        console.log(result)

        if (!response.ok) {
          throw new Error();
        }
        if (result.status) {
          setProducts(result.products);
          setFilteredProducts(result.products);
        }
      
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('An unknown error occurred');
        }
      }
    };

    getProducts();
  }, []);

  const applyFilter = () => {
    let filteredData = [...products];

    if (filterState.category && filterState.category !== 'all') {
      filteredData = filteredData.filter((product) => product.category === filterState.category);
    }

    if (filterState.color && filterState.color !== 'all') {
      filteredData = filteredData.filter((product) => product.color === filterState.color);
    }

    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange.split('-').map(Number);
      console.log(typeof(minPrice))
      filteredData = filteredData.filter((product) => product.discountedPercentage && product.discountedPrice !== undefined ? (product.discountedPrice >= minPrice && product.discountedPrice <= maxPrice) : (product.originalPrice >= minPrice && product.originalPrice <= maxPrice));
    }

    if (filterState.rating) {
      filteredData = filteredData.filter((product) => product.rating === filterState.rating);
    }
    

    setFilteredProducts(filteredData);
  };

  useEffect(() => {
    applyFilter();
  }, [filterState, products]);

  const clearFilter = () => {
    setFilterState({
      category: '',
      color: '',
      priceRange: '',
      rating: 0
    });
    setFilteredProducts(products);
  };

  return (
    <section className="section pt-4">
      <div className="section-title p-24 bg-primary-coloring flex flex-col justify-center items-center max-w-[70rem] w-full mx-auto rounded">
        <h2 className="font-bold">Shop Page</h2>
        <p className="max-w-[700px] w-full">
          Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
        </p>
      </div>
      <div className="section-center flex flex-col md:flex-row gap-16 md:gap-8 max-w-screen-xl">
        <aside className="w-full md:w-1/3">
          <Filter filters={filters} filterState={filterState} setFilterState={setFilterState} clearFilter={clearFilter} />
        </aside>
        <main className="flex flex-col gap-4">
          <span className="font-medium">Products {filteredProducts.length}</span>
          <CategoryProducts products={filteredProducts} />
        </main>
      </div>
    </section>
  );
};

export default Shop;
