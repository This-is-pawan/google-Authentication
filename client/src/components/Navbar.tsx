import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface User {
  name: string;
  email: string;
  photo: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get user data from cookies
    const cookieUser = Cookies.get("user");

    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser));
      } catch (err) {
        console.error("Failed to parse cookie user:", err);
        Cookies.remove("user");
      }
    }
  }, []);

  const handleLogout = async () => {
    // ✅ Remove cookie on logout
    Cookies.remove("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-pink-100 p-5 flex justify-between items-center">
      <h1 className="text-xl font-bold text-pink-700">My App</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-pink-300"
          />
          <div className="text-gray-700">
            <p className="font-semibold">
              Welcome, {user.name.split(" ")[0]} 👋
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={()=>{handleLogout()}}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          Login with Google
        </Link>
      )}
    </div>
  );
};

export default Navbar;
