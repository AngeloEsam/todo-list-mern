import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-white">To-Do App</h1>
        <nav className="space-x-8 text-lg font-medium">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition-colors duration-300 text-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 transition-all text-white font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-gray-200 transition-colors duration-300 text-lg"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
