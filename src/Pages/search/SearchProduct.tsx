import React, { useEffect, useState } from 'react';
import CategoryProducts from '../Categories/CategoryProducts';
import apis from "../../utils/apis";

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

interface SearchProductProps {
    filterValue: string;
}

const SearchProduct: React.FC<SearchProductProps> = ({ filterValue }) => {
    const [Products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const fetchedData = async () => {
        try {
            const response = await fetch(apis().getProducts, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (!response.ok) {
                console.log(result.message);
                return;
            }

            if (result.status && Array.isArray(result.products)) {
                console.log("Fetched Products:", result.products);
                setProducts(result.products);
            } else {
                console.log("Invalid response format");
            }

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchedData();
    }, []);

    useEffect(() => {
        console.log("Filter Value:", filterValue);
        console.log("Current Products:", Products);

        const filtered = filterValue.trim()
            ? Products.filter((product) =>
                product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                product.description.toLowerCase().includes(filterValue.toLowerCase())
            )
            : Products;

        console.log("Filtered Products:", filtered);
        setFilteredProducts(filtered);
    }, [filterValue, Products]);

    return (
        <div>
            {filteredProducts.length > 0 ? (
                <CategoryProducts products={filteredProducts} />
            ) : (
                <p>No products match your search.</p>
            )}
        </div>
    );
};

export default SearchProduct;
