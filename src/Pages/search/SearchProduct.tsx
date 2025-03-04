import React, { useEffect } from 'react';
import CategoryProducts from '../Categories/CategoryProducts';
import products from '../../data/products.json'; // Assuming the products data is stored here.

interface SearchProductProps {
    filterValue: string; // Define the expected prop type
}

const SearchProduct: React.FC<SearchProductProps> = ({ filterValue }) => {
    // Filter the products based on the input value

    const [filteredProducts, setFilteredProducts] = React.useState<typeof products>([]);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.description.toLowerCase().includes(filterValue.toLocaleLowerCase())
        );
        setFilteredProducts(filtered);
    }, [filterValue])
    

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
