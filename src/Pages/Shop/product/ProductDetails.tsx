import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Rating, Avatar } from "@mui/material";
import { addToCart } from "../../../redux/features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../../utils/apis";
import { RootState } from "../../../redux/store";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

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

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cnic: string;
  postalAddress: string;
  permanentAddress: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  imageUrl?: string;
  otp?: {
    otp: string;
    sendTime: number;
    token: string;
  };
  addToCart: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt?: Date;
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user_id, name } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { products: cartItems } = useSelector((state: RootState) => state.cart);
  const [comment, setComment] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [UserComment, setUserComment] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");

  // Fetch Single Product
  const getSingleProduct = async () => {
    try {
      const response = await fetch(
        `${apis().getSingleProduct.replace(":id", id!)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to fetch product");

      if (result.status) {
        setProduct(result.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch All Products
  const getProducts = async () => {
    try {
      const response = await fetch(apis().getProducts, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to fetch products");

      if (result.status) {
        setProductList(result.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(apis().getUsers, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
      }

      if (result.status) {
        console.log(result.message);
        setUsers(result.users);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(apis().addComment, {
        method: "POST",
        body: JSON.stringify({
          reviewerId: user_id,
          reviewerName: name,
          productId: product?._id,
          rating: userRating,
          comment: UserComment,
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
        setComment(false); // Close the modal
        setUserRating(0);
        setUserComment("");
        getSingleProduct(); // Refresh product data to reflect the new comment
      }
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  const deleteComment = async (reviewerId: string, productId: string) => {
    try {
      const response = await fetch(apis().deleteComment, {
        method: "POST",
        body: JSON.stringify({ reviewerId, productId }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        console.log(result.message);
        getSingleProduct(); // Refresh product data to remove deleted comment
      }
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  // Fetch product and product list on component mount
  useEffect(() => {
    getSingleProduct();
    getProducts();
    getUsers();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  }

  // Filter related products based on category
  const relatedProducts = productList.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  const handleAddToCart = async (cartProduct: Product) => {
    // Find the first available size with stock > 0
    const availableSize = cartProduct.subcategories.find(
      (sub) => sub.stock > 0
    );

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
          size: selectedItem, // Send the size as a string
          price: cartProduct.discountedPrice ?? cartProduct.originalPrice ?? 0,
          quantity: 1, // Always add 1 quantity at a time
        }),
        headers: { "Content-Type": "application/json" }, // Corrected header
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        dispatch(
          addToCart({
            productId: cartProduct._id,
            name: cartProduct.name,
            size: selectedItem,
            price:
              cartProduct.discountedPrice ?? cartProduct.originalPrice ?? 0,
            quantity: 1, // Always add 1 quantity at a time
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

  const directedToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="section pt-4">
      {/* Product Details */}
      <div className="section-title p-6 bg-primary-coloring flex flex-col justify-center items-center max-w-[70rem] w-full mx-auto rounded">
        <h2 className="font-bold text-2xl">{product.name}</h2>
      </div>
      <div className="section-center mt-8 max-w-[70rem] mx-auto grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="product-image w-full flex justify-center group overflow-hidden">
          <img
            src={product.imageURL}
            alt={product.name}
             className="rounded-lg w-full lg:w-4/5 object-cover transform transition duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="product-details flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-800 font-bold text-xl mb-4">
            ${product.discountedPrice ?? product.originalPrice}
          </p>

          <p className="flex gap-4">
  {product.subcategories.map((item) => (
    <span
      key={item.size}
      className={`h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition 
        ${
          !item.stock
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : selectedItem === item.size
            ? "bg-white text-red-600 ring-2 ring-red-600" // Selected: White background, Red text, Red ring
            : "bg-red-600 text-white hover:bg-red-50 hover:text-red-600" // Default: Red background, White text, Hover effect
        }`}
      onClick={() => item.stock && setSelectedItem(item.size)}
    >
      {item.size.charAt(0)}
    </span>
  ))}
</p>

          <p className="mb-4">
            <Rating name="read-only" value={product.rating} readOnly />
          </p>

          <Button
            variant="contained"
            color="error"
            sx={{ width: "150px" }}
            onClick={() => {
              if (user_id) {
                handleAddToCart(product);
              } else {
                navigate("/login");
              }
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="py-8 text-center mt-12">
        <div className="w-50 flex flex-col max-w-[70rem] w-full mx-auto">
          <h2 className="text-xl font-bold mb-12 text-left my-12">
            All Comments
          </h2>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-4 mb-4"
              >
                {/* {console.log("Users array:", users)}
                {console.log("Current review ID:", review.reviewerId)} */}

                <Avatar
                  alt={review.reviewerName}
                  src={(() => {
                    const foundUser = users.find(
                      (user) => review.reviewerId === user._id
                    );
                    //console.log("Matching User:", foundUser);
                    return foundUser?.imageUrl;
                  })()}
                />
                <div className="flex gap-20">
                  <div>
                    <h3 className="font-semibold">{review.reviewerName}</h3>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                  <div
                    className={`${
                      user_id === review.reviewerId ? "visible" : "hidden"
                    } self-end cursor-pointer`}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ width: "150px" }}
                      onClick={() =>
                        deleteComment(review.reviewerId, product._id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          <Button
            variant="contained"
            color="error"
            sx={{ width: "180px" }}
            onClick={() => setComment(true)}
          >
            Add Comment
          </Button>

          <div>
            {comment && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1000]">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-lg font-bold mb-4">Add a Comment</h2>
                  <Rating
                    name="user-rating"
                    onChange={(event, newValue) => setUserRating(newValue ?? 0)}
                  />
                  <textarea
                    className="w-full border-2 p-2 mt-2 h-[150px]"
                    placeholder="Write your comment..."
                    onChange={(event) => setUserComment(event.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-4 gap-4">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setComment(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="ml-2"
                      onClick={addComment}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      ;{/* Related Products Section */}
      <div className="flex flex-col items-center mt-16">
        <h2 className="font-bold text-2xl py-4">Related Products</h2>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-70rem">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct: Product) => {
              const isProductAvailable: boolean =
                relatedProduct.subcategories.some(
                  (sub: { size: string; stock: number }) => sub.stock > 0
                );
              return (
                <div
                  className="transform hover:scale-110 transition-all duration-300 relative"
                  key={relatedProduct._id}
                >
                  <Link to={`/shop/${relatedProduct._id}`}>
                    <img
                      src={relatedProduct.imageURL} // Fixed image reference
                      alt={relatedProduct.name} // Fixed alt text
                      style={{ borderRadius: "2rem" }}
                      className="max-h-96 md:h-64 w-full object-cover"
                    />
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                      <div className="flex gap-2 items-center">
                        {relatedProduct.discountedPrice ? ( // Fixed discount price reference
                          <>
                            <p className="line-through text-gray-500 mb-2">{`$${relatedProduct.originalPrice.toFixed(
                              2
                            )}`}</p>
                            <p className="text-green-600 font-bold mb-2">{`$${relatedProduct.discountedPrice.toFixed(
                              2
                            )}`}</p>
                          </>
                        ) : (
                          <p className="text-green-600 font-bold mb-2">{`$${relatedProduct.originalPrice.toFixed(
                            2
                          )}`}</p>
                        )}
                      </div>
                      <span>
                        <Rating
                          name="size-small"
                          value={relatedProduct.rating} // Fixed rating reference
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
                      onClick={
                        user_id
                          ? () => handleAddToCart(relatedProduct)
                          : directedToLogin
                      }
                      disabled={!isProductAvailable} // Disable if no size is available
                    >
                      <StyledBadge
                        badgeContent={
                          cartItems.find(
                            (item) => item.productId === relatedProduct._id
                          )?.quantity
                        }
                      >
                        <ShoppingCartIcon
                          style={{ color: isProductAvailable ? "red" : "gray" }}
                        />
                      </StyledBadge>
                    </IconButton>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
