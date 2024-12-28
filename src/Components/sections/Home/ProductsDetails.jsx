import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardMedia, Typography, Rating, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addToCart } from "../../redux/slice/Addtocart";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the addToCart action with the product
    navigate("/cart"); // Navigate to the cart page after adding to the cart
  };

  return (
    <div className="p-10 lg:px-32 flex flex-col gap-10">
      {/* Back Button */}
      <div className="flex justify-start">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Products
        </Button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            className="rounded-lg shadow-lg"
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "contain", // Ensures the image is fully visible
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <Typography variant="h4" className="font-bold">
            {product.title}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          <div className="flex items-center">
            <Rating value={product.rating.rate} readOnly precision={0.1} />
            <Typography variant="caption" className="ml-2 text-gray-500">
              ({product.rating.count})
            </Typography>
          </div>

          <Typography variant="h5" className="font-bold text-gray-800">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </Typography>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#008080",
              "&:hover": { backgroundColor: "#005f5f" },
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
