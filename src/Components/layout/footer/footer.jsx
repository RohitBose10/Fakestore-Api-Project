import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: "80px",
        backgroundColor: "#008080",
        textAlign: "center",
        pt: 4,
      }}
    >
      <Typography variant="body2" color="white">
        © 2024 Made by Rohit. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
