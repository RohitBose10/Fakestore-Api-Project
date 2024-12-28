import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../Components/sections/Home/Home";
import ProductDetailsPage from "../Components/sections/Home/ProductsDetails";
import CategoriesPage from "../Components/sections/Home/Categories";
import { Grid } from "@mui/material";
import CategoryProductsPage from "../Components/sections/Home/FetchbyCategory";
import Navbar from "../Components/layout/header/header";
import Footer from "../Components/layout/footer/footer";
import AddToCartPage from "../Components/sections/Cart/Cart";

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Grid item xs={12} sm={9} md={9} m={4}>
              <CategoriesPage />
              <HomePage />
            </Grid>
          }
        />

        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryProductsPage />} />
        <Route path="/cart" element={<AddToCartPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routing;
