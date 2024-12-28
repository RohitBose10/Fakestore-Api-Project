import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slice/Addtocart";

const AddToCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    Swal.fire({
      title: "Thank you for your purchase!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "Go to Home",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch clearCart action to empty the cart
        dispatch(clearCart());

        // Navigate to home page after the user clicks "Go to Home"
        navigate("/");
      }
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
        Cart Overview
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/assets/images/empty.png"
            alt="Empty Cart"
            className="w-100 h-100 mb-4"
          />
          <p className="text-xl text-gray-500">
            Nothing here yet! Start shopping to fill your cart.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white border border-gray-200"
              sx={{
                maxWidth: 400,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Product Image */}
              <div className="flex justify-center items-center w-full h-40 bg-gray-100 cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain max-h-full max-w-full"
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
                  title={item.title}
                >
                  {item.title}
                </Typography>

                <div className="flex items-center justify-center mt-2">
                  <Button onClick={() => handleDecrease(item)}>-</Button>
                  <Typography variant="body1" className="mx-2">
                    {item.quantity}
                  </Typography>
                  <Button onClick={() => handleIncrease(item)}>+</Button>
                </div>

                <div className="flex items-center justify-center mt-2">
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", marginTop: 1 }}
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price * item.quantity)}
                  </Typography>
                  <IconButton onClick={() => handleRemove(item)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div>
          <div className="flex justify-center mt-6">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                fontWeight: "bold",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                borderColor: "#008080",
                color: "#008080",
                "&:hover": {
                  backgroundColor: "#f0fdfa",
                  borderColor: "#005f5f",
                  color: "#005f5f",
                },
              }}
            >
              Continue Shopping
            </Button>
          </div>

          <div className="flex justify-center items-center flex-col gap-4 mt-8 p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto border border-gray-200">
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Total:{" "}
              <span style={{ color: "#008080" }}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(calculateTotalPrice())}
              </span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceedToCheckout}
              sx={{
                backgroundColor: "#008080",
                fontWeight: "bold",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#005f5f",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
