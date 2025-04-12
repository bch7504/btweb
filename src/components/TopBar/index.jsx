import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";


import "./styles.css";


function TopBar() {

  return (
    <AppBar position="fixed" className="top-bar">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          Bùi Công Hậu - B22DCCN283
        </Typography>


        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
          <Typography variant="h6">Photo Sharing App</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;