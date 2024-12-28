import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import "tailwindcss/tailwind.css";
import { fetchProducts } from "../../redux/slice/ProductSlice";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CategoryProductsPage = () => {
  const { category } = useParams(); // Extract category from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Filter products based on the selected category
    if (products.length > 0) {
      const categoryProducts = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(categoryProducts);
    }
  }, [products, category]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Failed to fetch products</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Products
        </Button>
      </div>

      {/* Category Title */}
      <h1 className="text-3xl font-bold text-center mb-6 capitalize text-teal-600">
        {category} Products
      </h1>

      {/* Products Grid */}
      <div className="px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white border border-gray-200"
              sx={{
                maxWidth: 400,
                minHeight: 450,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Product Image */}
              <div
                className="flex justify-center items-center w-full h-64 bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Product Details */}
              <CardContent
                className="flex flex-col items-center text-center p-3"
                sx={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  component="div"
                  className="text-sm font-medium text-gray-800"
                  title={product.title}
                  sx={{
                    overflowWrap: "break-word", // Breaks long words into multiple lines
                    textAlign: "center", // Keeps the text centered
                    maxHeight: "3rem", // Restricts height to two lines
                    overflow: "hidden", // Hides excess text if it overflows two lines
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Limits to 2 lines
                  }}
                >
                  {product.title}
                </Typography>

                <div className="mt-2 flex items-center justify-center">
                  <Rating
                    value={product.rating.rate}
                    readOnly
                    precision={0.1}
                    size="small"
                  />
                  <Typography
                    variant="caption"
                    sx={{ marginLeft: 1, color: "gray" }}
                  >
                    ({product.rating.count})
                  </Typography>
                </div>

                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginTop: 1 }}
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryProductsPage;
