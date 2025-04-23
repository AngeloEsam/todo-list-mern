import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import PublicRoute from "../utils/PublicRoute.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
