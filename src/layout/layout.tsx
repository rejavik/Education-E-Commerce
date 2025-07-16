import Navigation from "./navigation";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <Box
    // sx={{
    //   position: "revert",
    // }}
    >
      <Navigation />
      <Box sx={{ padding: "80px" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
