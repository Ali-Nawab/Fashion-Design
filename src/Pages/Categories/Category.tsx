import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Products from "../../data/products.json"
import CategoryProducts from './CategoryProducts'

const Category: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [ filteredProduct, setFilteredProduct ] = React.useState<any[]>([]);

    useEffect(() => {

        const filteredProducts = Products.filter((product) => product.category === category);
        setFilteredProduct(filteredProducts);

    }, [category]);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

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
  )
}

export default Category