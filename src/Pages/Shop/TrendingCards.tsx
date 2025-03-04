import React, {useState, useEffect} from 'react'
import ProductsCard from './ProductsCard'
import { Button } from "@mui/material"
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

const TrendingCards: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [productsVisible, setProductsVisible] = useState<number>(8)

    const fetchProducts = async () => {
        try {
            const response = await fetch(apis().getProducts, {
                method: "GET",
                headers: { "Content-Type": "application/json"}
            })

            const result = await response.json()

            if(!response.ok) {
                throw new Error(result.message)
            }
            if(result.status) {
                setProducts(result.products)
            }
        } catch(error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(String(error));
            }
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [productsVisible])
    return (
        <section className="section">
            <div className="section-title trending-title mb-10">
                <h2 className="font-bold text-4xl">Trending Products</h2>
            </div>
            <div className="text-justify px-4 mx-auto max-w-4xl mb-10">
                <p>Discover the Hottest Picks: Elavate your Style with Our Curated Collection of Trending Women's Fashion Products.</p>
            </div>
            <div className="section-center mt-16">
                <ProductsCard products={products.slice(0, productsVisible)} />
            </div>
            <div className="flex justify-center mt-10">
                {
                    productsVisible < products.length && (
                        <Button variant="contained" color="error" onClick={() => setProductsVisible((prev) => prev + 2)}> Load More</Button>
                    )
                }
                
            </div>
        </section>
    )
}

export default TrendingCards