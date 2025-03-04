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
import apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";

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

// StyledBadge Component
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

// Animation Variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const ProductsCard: React.FC<ProductsCardProps> = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products: cartItems } = useSelector((state: RootState) => state.cart);
  const { user_id } = useSelector((state: RootState) => state.user);

  const handleAddToCart = async (cartProduct: Product) => {
    const availableSize = cartProduct.subcategories.find((sub) => sub.stock > 0);

    if (!availableSize) {
      alert("No available sizes in stock for this product.");
      return;
    }

    try {
      const response = await fetch(apis().addToCart, {
        method: "POST",
        body: JSON.stringify({
          userId: user_id,
          productId: cartProduct._id,
          name: cartProduct.name,
          size: availableSize.size,
          price: cartProduct.discountedPrice ?? cartProduct.originalPrice ?? 0,
          quantity: 1,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        console.log(result.message);
        dispatch(
          addToCart({
            productId: cartProduct._id,
            name: cartProduct.name,
            size: availableSize.size,
            price: cartProduct.discountedPrice ?? cartProduct.originalPrice ?? 0,
            quantity: 1,
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const directToLogin = () => {
    navigate("/login");
  };

  return (
    <motion.article
      className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {products.map((product: Product, index: number) => {
        const isProductAvailable = product.subcategories.some(
          (sub) => sub.stock > 0
        );

        return (
          <motion.div
            key={index}
            className="relative "
            variants={cardVariants}
            whileHover="hover"
          >
            <Link to={`/shop/${product._id}`}>
              <motion.img
                src={product.imageURL}
                alt={product.name}
                style={{ borderRadius: "2rem" }}
                className="max-h-96 md:h-64 w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div className="mt-4" variants={textVariants}>
                <h3 className="font-bold mb-2">{product.name}</h3>
                <div className="flex gap-2 items-center">
                  {product.discountedPrice ? (
                    <>
                      <p className="line-through text-gray-500 mb-2">{`$${product.originalPrice.toFixed(
                        2
                      )}`}</p>
                      <p className="text-green-600 font-bold mb-2">{`$${product.discountedPrice.toFixed(
                        2
                      )}`}</p>
                    </>
                  ) : (
                    <p className="text-green-600 font-bold mb-2">{`$${product.originalPrice.toFixed(
                      2
                    )}`}</p>
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
              </motion.div>
            </Link>
            {/* Add to Cart Icon */}
            <motion.div
              className="absolute top-2 right-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                aria-label="cart"
                onClick={user_id ? () => handleAddToCart(product) : directToLogin}
                disabled={!isProductAvailable}
              >
                <StyledBadge
                  badgeContent={
                    cartItems.find((item) => item.productId === product._id)
                      ?.quantity
                  }
                >
                  <ShoppingCartIcon
                    style={{ color: isProductAvailable ? "red" : "gray" }}
                  />
                </StyledBadge>
              </IconButton>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.article>
  );
};

export default ProductsCard;