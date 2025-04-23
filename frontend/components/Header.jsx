import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">To-Do App</h1>
      <nav className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
