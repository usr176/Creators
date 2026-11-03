import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";

import MainLayout from "./pages/MainLayout";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";
import Community from "./pages/Community";
import About from "./pages/About"

import Auth from "./pages/Auth";
import Profile from "./pages/profile";

import Guidelines from "./pages/Guidelines";
import Terms from "./pages/Terms";
import LegalPage from "./pages/LegalPage";
import Privacy from "./pages/Privacy";


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/store/:storeId" element={<Store />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/About" element={<About />} />

            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

          </Route>


        </Routes>
        <Toaster closeButton duration={4000} />
      </BrowserRouter>
    </CartProvider>
  );

}

export default App