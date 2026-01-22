import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Premium from "./pages/Premium";
import Promo from "./pages/Promo";
import Referral from "./pages/Referral";
import Support from "./pages/Support";
import Tool from "./pages/Tool";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/support" element={<Support />} />
        <Route path="/tool/:slug" element={<Tool />} />
      </Routes>
    </BrowserRouter>
  );
}
