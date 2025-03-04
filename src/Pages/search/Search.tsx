import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchProduct from './SearchProduct';

const Search: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredValue, setFilteredValue] = useState<string>('');

    // Handle input change
    const getInputValue = (value: string) => {
        setInputValue(value);
        setFilteredValue(value); // Update the filtered value in real-time
    };

    // Handle keypress events
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setFilteredValue(inputValue); // Trigger the search when Enter is pressed
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="section pt-2">
            <div className="section-title p-24 bg-primary-coloring flex flex-col justify-center items-center">
                <h2 className="font-bold">Search Products</h2>
                <p className="max-w-[700px] w-full">
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </div>
            <div className="flex justify-center items-center gap-4 mb-20">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => getInputValue(e.target.value)}
                    onKeyDown={handleKeyPress} // Listen for Enter key
                    value={inputValue} // Bind the value to the input
                    sx={{
                        maxWidth: '700px',
                        '& .MuiInputBase-root': {
                            height: '40px',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setFilteredValue(inputValue)}
                >
                    Search
                </Button>
            </div>
            <div className="section-center">
                <SearchProduct filterValue={filteredValue} />
            </div>
        </section>
    );
};

export default Search;
