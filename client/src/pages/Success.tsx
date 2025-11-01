import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const photo = searchParams.get("photo");

    if (email && name) {
      const user = { name, email, photo };

      // ✅ Write cookie safely
      Cookies.set("user", JSON.stringify(user), {
        expires: 7,
        sameSite: "Lax",
      });

      // ✅ Wait for next tick so cookie is available before redirect
      setTimeout(() => {
        window.location.href = "/dashboard"; 
      }, 200);
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <div>Logging you in... Please wait.</div>;
};

export default Success;
