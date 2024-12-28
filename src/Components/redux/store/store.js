import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slice/ProductSlice";
import cartReducer from "../slice/Addtocart"

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
