import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Header from "../components/Header.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
