import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/user"
        );
        setUser(res.data.user); 
      } catch (err) {
        setUser(null);
      }
    }; 
    getUser();
  }, []);

  return (
    <>
      <Navbar user={user} />
    </>
  );
}

export default App;
