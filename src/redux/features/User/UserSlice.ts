import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  user_id: string;
  name: string;
  email: string;
  imageURL: string;
}

// Load user data from local storage
const storedUser = localStorage.getItem("user");
const initialState: User = storedUser
  ? JSON.parse(storedUser)
  : { user_id: "", name: "", email: "", imageURL: "" }; // Default state

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to set the user's data
    setUser(state, action: PayloadAction<User>) {
      const newUser = action.payload;
      state.user_id = newUser.user_id;
      state.name = newUser.name;
      state.email = newUser.email;
      state.imageURL = newUser.imageURL;

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    
    // Reducer to clear the user's data (e.g., on logout)
    clearUser(state) {
      state.user_id = "";
      state.name = "";
      state.email = "";
      state.imageURL = "";
      localStorage.removeItem("user");
    },
  },
});

// Export the actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
