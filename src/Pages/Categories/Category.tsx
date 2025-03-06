import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryProducts from './CategoryProducts';
import apis from '../../utils/apis';

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

const Category: React.FC = () => {
    const { category } = useParams<{ category: string }>();

    // Change the state types to properly store arrays of products
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

    // Fetch Data
    const fetchProducts = async () => {
        try {
            const response = await fetch(apis().getProducts, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.message);
                return;
            }

            if (result.status) {
                console.log('Fetched products:', result.products);
                setProducts(result.products); // Store products
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : String(error));
        }
    };

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products when 'products' or 'category' changes
    useEffect(() => {
        if (products.length > 0 && category) {
            const filtered = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
            console.log('Filtered Products:', filtered);
            setFilteredProduct(filtered);
        }
    }, [products, category]); // Runs when either `products` or `category` changes

    // Scroll to top when category changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <section className="section pt-2">
            <div className="section-title p-24 bg-primary-coloring flex flex-col justify-center items-center">
                <h2 className="font-bold">{category}</h2>
                <p className="max-w-[700px] w-full">Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
            </div>
            <div className="section-center">
                <CategoryProducts products={filteredProduct} />
            </div>
        </section>
    );
};

export default Category;
