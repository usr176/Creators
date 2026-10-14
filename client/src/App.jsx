import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import MainLayout from "./pages/MainLayout";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/Community";
import About from "./pages/About"

import Auth from "./pages/Auth";
import Profile from "./pages/profile";


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/About" element={<About />} />

          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route path="/profile" element={<Profile />}/>
        
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
    
}

export default App
