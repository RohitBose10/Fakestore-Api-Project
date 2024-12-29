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
  Box,
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
    <Box sx={{ padding: { xs: 2, md: 6 } }}>
      {/* Header with Sort Options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          flexDirection: { xs: "row", md: "row" },
          gap: 2,
          textAlign: { xs: "center", md: "left" }, // Center align for small screens
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, // Adjust font size for screen size
            color: "#008080",
          }}
        >
          Exclusive Collection
        </Typography>

        <Select
          value={sortCriteria}
          onChange={handleSortChange}
          size="small"
          variant="outlined"
          sx={{
            minWidth: { xs: 120, sm: 150 }, // Adjust width for small screens
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
      </Box>

      {/* Product Cards */}
      <Box
        sx={{
          marginTop: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 4,
        }}
      >
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 4,
              },
            }}
          >
            {/* Product Image */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: 200, sm: 250 },
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              }}
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
            </Box>

            {/* Product Details */}
            <CardContent
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                title={product.title}
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textOverflow: "ellipsis",
                  fontWeight: "medium",
                  color: "#333",
                }}
              >
                {product.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Rating
                  value={product.rating.rate}
                  readOnly
                  precision={0.1}
                  size="small"
                />
                <Typography variant="caption" sx={{ color: "gray" }}>
                  ({product.rating.count})
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: "bold" }}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
