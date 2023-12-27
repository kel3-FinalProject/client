import { useState, useEffect } from "react";
import Logo from "../assets/img/logo/logo_hotel.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {logoutAccessToken} from "../utils/network";

const Header = () => {
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  const isHomeAdmin = location.pathname === "/Home-Admin";

    function handleLogout() {
    logoutAccessToken();
    navigate("/Login");
  }

  return (
    <header
      className={`${
        header ? "bg-gray-300 py-3 shadow-lg" : "bg-transparent py-6"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between lg:gap-y-0">
        <a href="/">{<img className="w-[160px]" src={Logo} alt="Logo" />}</a>
        <nav
          className={`${
            header ? "text-black" : "text-white"
          } flex gap-x-3 font-tertiary tracking-[3px] text-[14px] items-center uppercase lg:gap-6`}
        >
          {isHomeAdmin ? (
            <>
              <Link to="/Home-Admin" className="hover:text-teal-700 transition">
                Home
              </Link>
              <Link to="/Add-Kamar" className="hover:text-teal-700 transition">
                Add Kamar
              </Link>
              <Link
                to="/Reservasi-Admin"
                className="hover:text-teal-700 transition"
              >
                Reservasi
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-teal-700 transition font-[14px] uppercase"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/Home" className="hover:text-teal-700 transition">
                Home
              </Link>
              <Link to="/Rooms" className="hover:text-teal-700 transition">
                Kamar
              </Link>
              <Link to="/Reservasi" className="hover:text-teal-700 transition">
                Reservasi
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-teal-700 transition"
              >
                LOGOUT
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
