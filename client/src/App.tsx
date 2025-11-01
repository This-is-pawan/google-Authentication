// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
<Navbar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </div>
  );
}

export default App;
