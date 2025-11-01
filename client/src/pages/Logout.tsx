import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1️⃣ Call backend to destroy passport session
       await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true, 
      });

      

      // 2️⃣ Remove frontend cookie
      Cookies.remove("user");

      // 3️⃣ Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
