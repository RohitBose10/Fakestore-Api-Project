import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/slice/ProductSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "price") {
      return a.price - b.price;
    } else if (sortCriteria === "rating") {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      {/* Header with Sort Options */}
      <div className="p-6 flex justify-between items-center">
        <h1
          className="text-3xl font-bold text-center flex-grow pt-4 pb-4"
          style={{ color: "#008080" }}
        >
          Explore Our Exclusive Collection of Products
        </h1>

        <Select
          value={sortCriteria}
          onChange={handleSortChange}
          size="small"
          variant="outlined"
          sx={{
            border: "1px solid #008080",
            borderRadius: "4px",
            color: "#008080",
            "&:hover": { borderColor: "#005f5f" },
          }}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="price">Sort by Price</MenuItem>
          <MenuItem value="rating">Sort by Rating</MenuItem>
        </Select>
      </div>

      {/* Product Cards */}
      <div className="px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
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

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
