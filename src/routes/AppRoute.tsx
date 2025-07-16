import { Route, Routes } from "react-router-dom";
import Layout from "../layout/layout";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import FavoritePage from "../pages/FavoritePage";
import ProductDetailPage from "../pages/ProductDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route key={"protected"} element={<ProtectedRoute />}>
        <Route path="/" element={<AuthPage />} />
      </Route>
      {/* Protected Routes */}
      <Route key={"layout"} element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/favorites/:id" element={<FavoritePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
