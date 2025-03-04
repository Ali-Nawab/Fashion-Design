import React from 'react';
import Rating from '@mui/material/Rating';

interface FilterProps {
  filters: {
    categories: string[];
    colors: string[];
    priceRange: { label: string; min: number; max: number }[];
    ratings: number[];
  };
  filterState: {
    category: string;
    color: string;
    priceRange: string;
    rating: number;
  };
  setFilterState: React.Dispatch<
    React.SetStateAction<{
      category: string;
      color: string;
      priceRange: string;
      rating: number;
    }>
  >;
  clearFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({
  filters,
  filterState,
  setFilterState,
  clearFilter
}) => {

  const handleRatingChange = (newRating: number) => {
    console.log('Rating clicked:', newRating);  // Log the clicked rating value
    setFilterState({ ...filterState, rating: newRating });
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium">Category</h4>
        <hr className="mb-2" />
        <div>
          {filters.categories.map((category) => (
            <label key={category} className="flex items-center mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filterState.category === category}
                onChange={(e) =>
                  setFilterState({ ...filterState, category: e.target.value })
                }
                className="mr-2"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="font-medium">Color</h4>
        <hr className="mb-2" />
        <div>
          {filters.colors.map((color) => (
            <label key={color} className="flex items-center mb-2">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState({ ...filterState, color: e.target.value })
                }
                className="mr-2"
              />
              <span>{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium">Price Range</h4>
        <hr className="mb-2" />
        <div>
          {filters.priceRange.map((range) => (
            <label key={range.label} className="flex items-center mb-2">
              <input
                type="radio"
                name="priceRange"
                value={`${range.min}-${range.max}`}
                checked={filterState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) =>
                  setFilterState({ ...filterState, priceRange: e.target.value })
                }
                className="mr-2"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium">Rating</h4>
        <hr className="mb-2" />
        <div>
          {filters.ratings.map((rating) => (
            <label key={rating} className="flex items-center mb-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filterState.rating === rating}
                onChange={() => handleRatingChange(rating)} // Log and update state here
                className="mr-2"
              />
              <div className="flex items-center">
                {/* Ensured the Rating component always receives a defined value */}
                <Rating value={rating || 0} readOnly />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filter Button */}
      <button
        onClick={clearFilter}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
