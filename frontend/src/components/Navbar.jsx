import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import { useEffect } from "react";
function LandingToolbar({ user, setUser }) {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open shopping cart"
        sx={{ m: 2 }}
      >
        <DirectionsRunIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        LifeTracker
      </Typography>

      {user ? (
        <Button
          onClick={() => setUser(null)}
          component={Typography}
          variant="h5"
        >
          Logout
        </Button>
      ) : (
        <Link to="/login" style={{ color: "white" }}>
          <Typography variant="h5">Login</Typography>
        </Link>
      )}
    </Toolbar>
  );
}

export default function Navbar(props) {
  //   useEffect(() => {
  //     console.log(window.location);
  //   }, []);
  const landingRoute = (
    <Route path="/*" element={<LandingToolbar {...props} />}></Route>
  );
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static">
        <Routes>{landingRoute}</Routes>
      </AppBar>
    </Box>
  );
}
