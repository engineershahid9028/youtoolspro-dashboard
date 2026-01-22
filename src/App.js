import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Tool from "./pages/Tool";
import Premium from "./pages/Premium";
import Admin from "./pages/Admin";
import Support from "./pages/Support";
import Referral from "./pages/Referral";
import Promo from "./pages/Promo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tool/:name" element={<Tool />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/support" element={<Support />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/promo" element={<Promo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
