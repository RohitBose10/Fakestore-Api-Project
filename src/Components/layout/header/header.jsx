import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import the cart icon

const Navbar = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#008080", height: "100px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Products
          </Button>
          {/* Cart Button with icon */}
          <Button
            color="inherit"
            component={Link}
            to="/cart"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "none",
              display: "flex", // Use flex to align icon and text
              alignItems: "center",
            }}
          >
            <ShoppingCartIcon sx={{ marginRight: 1 }} /> {/* Cart icon */}
            My Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
