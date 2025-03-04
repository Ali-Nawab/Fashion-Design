import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, clearCart } from "../../redux/features/cart/CartSlice";
import { RootState } from "../../redux/store";
import Button from "@mui/material/Button";
import apis from "../../utils/apis";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

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

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string | null;
}

interface CartModelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModel: React.FC<CartModelProps> = ({ isOpen, onClose }) => {
  const { products, grandTotal } = useSelector(
    (state: RootState) => state.cart
  );
  const [productList, setProductList] = useState<Product[]>([]);
  const { user_id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleCheckOut = async (option: string) => {
    try {
      const payload = {
        userId: user_id,
        paymentMethod: option,
        products: products.map((product) => ({
          productId: product.productId,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          size: product.size,
        })),
      };

      console.log(payload);

      const response = await fetch(apis().orderStatus, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update order status");
      }

      if (result.status) {
        console.log(result.message);
        toast.dismiss();
        toast.success("Order Id has been send to your email. Check your email");
      }

      if (option === "Cash On Delivery") {
        navigate("/track/order");
      } else {
        const stripe = await loadStripe(
          "pk_test_51QqpMSP0W8YmqfKC5xe5iMgGJbVd0EHoZRydljn37HGEoa8DEqunUFmflGWlisIBTl5UFyNYXZVu8xRyiLrKwnHT00PBLuhKDK"
        );

        const data = products.map((product) => ({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          size: product.size
        }))

        console.log(data)

        const response = await fetch(apis().stripePayment, {
          method: "POST",
          body: JSON.stringify({data}),
          headers: { 
            'Content-Type': 'application/json'
          }
        });
        
        const session = await response.json();
        console.log("Session Response:", session); // Log the response
        
        if (!session.id) {
          throw new Error("Session ID not found in the response");
        }
        
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });
        
        if (result?.error) {
          console.log(result.error.message);
        }
        
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during checkout:", error.message);
        alert(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  const handleQuantityChange = (
    id: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity >= 0) {
      dispatch(updateCart({ id, size, quantity: newQuantity }));
    }
  };

  const getProductList = async () => {
    try {
      const response = await fetch(apis().getProducts, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      if (result.status) {
        setProductList(result.products);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  const cartClear = async () => {
    try {
      const response = await fetch(apis().clearCart, {
        method: "POST",
        body: JSON.stringify({ userId: user_id }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        dispatch(clearCart());
        throw new Error(result.message || "Failed to clear the cart");
      }

      if (result.status) {
        console.log(result.message);
        dispatch(clearCart());
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  const addToCart = async (product: CartItem) => {
    try {
      const response = await fetch(apis().addToCart, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user_id,
          productId: product.productId,
          name: product.name,
          price: product.price,
          size: product.size,
          quantity: product.quantity + 1,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
      }
      if (result.status) {
        handleQuantityChange(
          product.productId,
          product.size ?? "",
          product.quantity + 1
        );
        console.log(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  const removeFromCart = async (product: CartItem) => {
    try {
      const response = await fetch(apis().removeFromCart, {
        method: "POST",
        body: JSON.stringify({
          userId: user_id,
          productId: product.productId,
          size: product.size,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
      }

      if (result.status) {
        handleQuantityChange(
          product.productId,
          product.size ?? "",
          product.quantity - 1
        );
        console.log(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  useEffect(() => {
    getProductList();
  }, [user_id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-80"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 mt-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Your Cart</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    // Delay the onClose function to allow the exit animation to complete
                    setTimeout(onClose, 300);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <i className="ri-close-fill bg-black p-2 text-white rounded-full"></i>
                </motion.button>
              </div>

              {/* Cart Content */}
              <div>
                {products.length === 0 && productList.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    Your cart is empty
                  </div>
                ) : (
                  products.map((product) => {
                    const productData = productList.find(
                      (data) => data._id === product.productId
                    );
                    return (
                      productData && (
                        <motion.div
                          key={product.productId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between mb-4 border-b pb-4"
                        >
                          <div className="flex items-center gap-4">
                            {/* Product Image */}
                            <img
                              src={productData.imageURL}
                              alt={productData.name}
                              className="w-16 h-20 object-cover rounded-lg"
                            />

                            {/* Product Details */}
                            <div>
                              <h5 className="font-semibold">
                                {productData.name}
                              </h5>
                              <p className="text-gray-500 text-sm">{`$${product.price.toFixed(
                                2
                              )} x ${product.quantity}`}</p>
                              <span className="font-semibold">
                                {product.size}
                              </span>
                            </div>
                          </div>

                          {/* Total Price */}
                          <div className="text-right">
                            <p className="font-semibold">{`$${(
                              product.price * product.quantity
                            ).toFixed(2)}`}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                              onClick={() => removeFromCart(product)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-12 text-center border rounded"
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product.productId,
                                  product.size ?? "",
                                  Math.max(0, parseInt(e.target.value, 10) || 0)
                                )
                              }
                              min="0"
                            />
                            <button
                              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                              onClick={() => addToCart(product)}
                            >
                              +
                            </button>
                          </div>
                        </motion.div>
                      )
                    );
                  })
                )}
              </div>

              <div className="flex justify-around items-center">
                <p>
                  <strong>Grand Total: </strong>
                </p>
                <p className="text-gray-500">{grandTotal.toFixed(2)} $</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                <h3 className="font-bold mb-4">Payment</h3>
                <div className="flex flex-col gap-4">
                  <Checkbox
                    checked={selectedOption === "Cash On Delivery"}
                    onChange={() => handleCheckboxChange("Cash On Delivery")}
                    label="Cash On Delivery"
                    description="Cash will be taken at Home"
                    color="grape"
                    variant="outline"
                  />

                  <Checkbox
                    checked={selectedOption === "Stripe"}
                    onChange={() => handleCheckboxChange("Stripe")}
                    label="Stripe"
                    description="Online Payment"
                    color="grape"
                    variant="outline"
                  />
                </div>
              </motion.div>

              <div className="flex justify-between items-center">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "150px" }}
                  onClick={cartClear}
                >
                  Clear Cart
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "200px" }}
                  onClick={() =>
                    selectedOption && handleCheckOut(selectedOption)
                  }
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModel;
