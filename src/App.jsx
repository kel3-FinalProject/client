import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import Rooms from "./components/Rooms";
import Reservasi from "./components/Reservasi";
import Receipe from "./components/ReceipeBooking";
import HomeAdmin from "./pages/HomeAdmin";
import AddKamar from "./components/AddKamar";
import EditKamar from "./components/EditKamar";
import { getAccessToken } from "./utils/network";

function AuthLogin() {
  const auth = getAccessToken();
  if (!auth) {
    return <Navigate to="/Login" />;
  }
  return <Outlet />;
}

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";
  const isRegisterPage = location.pathname === "/Register";

  return (
    <div
      className={`${
        isLoginPage || isRegisterPage
          ? ' text-white h-[100vh] flex justify-center items-center bg-cover bg-[url("./src/assets/img/bg-awal.jpg")]'
          : ""
      }`}
    >
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<AuthLogin />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Home-Admin" element={<HomeAdmin />} />
          <Route path="/Add-Kamar" element={<AddKamar />} />
          <Route path="/Edit-Kamar" element={<EditKamar />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/Reservasi" element={<Reservasi />} />
          <Route path="/Reservasi-Admin" element={<Reservasi />} />
          <Route path="/Receipe" element={<Receipe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
