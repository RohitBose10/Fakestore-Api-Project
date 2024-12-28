import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/slice/ProductSlice";
import "tailwindcss/tailwind.css";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setIsDrawerOpen(false);
  };

  return (
    <div>
      {/* Button to Open Drawer */}
      <Button
        startIcon={<MenuIcon />}
        variant="outlined"
        onClick={() => setIsDrawerOpen(true)}
        className="m-4"
        sx={{ color: "teal" }}
      >
        Categories
      </Button>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6" className="font-bold text-teal-500">
            Categories
          </Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List className="w-64">
          {categories.map((category) => (
            <ListItem
              button
              key={category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default CategoriesPage;
