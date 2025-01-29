import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer /> {/* Added Footer here */}
    </Router>
  );
};

export default App;
