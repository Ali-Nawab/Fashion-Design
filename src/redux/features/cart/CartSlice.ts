import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  productId: string; // Changed to string
  name: string;
  price: number;
  quantity: number;
  size: string | null
}

interface CartState {
  products: Product[];
  selectedItems: number; // Total quantity of items in the cart
  totalPrice: number; // Total price of items in the cart before tax
  tax: number; // Tax amount
  taxRate: number; // Tax rate percentage
  grandTotal: number; // Total price including tax
}

const initialState: CartState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05, // 5% tax
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const newProduct = action.payload;

      // Check if the product already exists in the cart
      const existingProduct = state.products.find(
        (product) => product.productId === newProduct.productId && product.size === newProduct.size
      );

      if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity += newProduct.quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        state.products.push({ ...newProduct });
      }

      // Update totals
      state.selectedItems += newProduct.quantity;
      state.totalPrice += newProduct.price * newProduct.quantity;
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      // Changed payload type to string
      const productId = action.payload;

      // Find the product in the cart
      const existingProduct = state.products.find(
        (product) => product.productId === productId && product.size
      );

      if (existingProduct) {
        // Update totals
        state.selectedItems -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.tax = state.totalPrice * state.taxRate;
        state.grandTotal = state.totalPrice + state.tax;

        // Remove the product from the cart
        state.products = state.products.filter(
          (product) => product.productId !== productId
        );
      }
    },

    updateCart(state, action: PayloadAction<{ id: string; size: string | null; quantity: number }>) {
      const { id, size, quantity } = action.payload;

      // Find the product in the cart
      const existingProduct = state.products.find(
        (product) => product.productId === id && product.size === size
      );

      if (existingProduct) {
        // Calculate the difference in quantity and price
        const quantityDifference = quantity - existingProduct.quantity;
        const priceDifference = quantityDifference * existingProduct.price;

        // Update the product quantity
        existingProduct.quantity = quantity;

        // Update totals
        state.selectedItems += quantityDifference;
        state.totalPrice += priceDifference;
        state.tax = state.totalPrice * state.taxRate;
        state.grandTotal = state.totalPrice + state.tax;
      }
    },

    setCart(state, action: PayloadAction<Product[]>) {
      const userCartData = action.payload;
    
      state.products = userCartData;
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    
      userCartData.forEach((product) => {
        state.selectedItems += product.quantity;
        state.totalPrice += product.price * product.quantity;
      });
    
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
    
    clearCart(state) {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;