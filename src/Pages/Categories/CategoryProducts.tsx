import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/CartSlice";

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

interface ProductsCardProps {
  products: Product[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string | null;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    backgroundColor: "white", // Badge background color
    color: "black", // Badge text color
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CategoryProducts: React.FC<ProductsCardProps> = ({ products }) => {
  const dispatch = useDispatch();
  console.log(products)

  const { products: cartItems } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (cartProduct: Product) => {
    const availabeSize = cartProduct.subcategories.find((sub) => sub.stock > 0)
    const cartItem: CartItem = {
      productId: cartProduct._id,
      name: cartProduct.name,
      price: cartProduct.discountedPrice ?? cartProduct.originalPrice ?? 0,
      quantity: 1,
      size: availabeSize?.size ?? null
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <article className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product, index: number) => (
        <div
          className="transform hover:scale-110 transition-all duration-300 relative"
          key={index}
        >
          <Link to={`/shop/${product._id}`}>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ borderRadius: "2rem" }}
              className="max-h-96 md:h-64 w-full object-cover"
            />
            <div className="mt-4">
              <h3 className="font-bold mb-2">{product.name}</h3>
              <div className="flex gap-2 items-center">
                {product.originalPrice ? (
                  <>
                    <p className="line-through text-gray-500 mb-2">{`$${product.originalPrice.toFixed(
                      2
                    )}`}</p>
                    <p className="text-green-600 font-bold mb-2">{`$${product.originalPrice.toFixed(
                      2
                    )}`}</p>
                  </>
                ) : (
                  <p className="text-green-600 font-bold mb-2">{`$${(
                    product.discountedPrice ?? 0
                  ).toFixed(2)}`}</p>
                )}
              </div>
              <span>
                <Rating
                  name="size-small"
                  value={product.rating}
                  size="small"
                  readOnly
                />
              </span>
            </div>
          </Link>
          {/* Add to Cart Icon */}
          <div className="absolute top-2 right-2">
            <IconButton
              aria-label="cart"
              onClick={() => handleAddToCart(product)}
            >
              <StyledBadge
                badgeContent={
                  cartItems.find((item) => item.productId === product._id)?.quantity
                }
              >
                <ShoppingCartIcon style={{ color: "red" }} />
              </StyledBadge>
            </IconButton>
          </div>
        </div>
      ))}
    </article>
  );
};

export default CategoryProducts;
