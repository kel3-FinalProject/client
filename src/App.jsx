import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";
  const isRegisterPage = location.pathname === "/Register";

  return (
    <div className={`text-white ${isLoginPage || isRegisterPage ? 'h-[100vh] flex justify-center items-center bg-cover bg-[url("./src/assets/img/bg-awal.jpg")]' : ''}`}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetails />} />
      </Routes>
    </div>
  );
}

export default App;
