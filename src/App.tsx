import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from "./layouts/LayoutDefault";
import { BrandManagement } from "./pages/BrandManagement";
import { EvaluateDetail } from "./pages/EvaluateDetail";
import { EvaluateLists } from "./pages/EvaluateLists";
import OrderManagement from "./pages/OrderManagement";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<ProductManagement />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/brand-management" element={<BrandManagement />} />
          <Route path="/evaluate-Lists" element={<EvaluateLists />} />
          <Route path="/evaluate-detail/:id" element={<EvaluateDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
