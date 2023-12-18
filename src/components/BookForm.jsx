import { useContext } from "react";
import CheckIn from "./CheckIn";
import TypeDropdown from "./TypeDropdown";
import CheckOut from "./CheckOut";
import Search from "./Search";
import { RoomContext } from "../pages/RoomContext";
import { useLocation } from "react-router-dom";

const BookForm = () => {
  const location = useLocation();
  const isHomeAdmin = location.pathname === "/Home-Admin";
  const { handleClick } = useContext(RoomContext);
  return (
    <form className="h-[300px] w-full lg:h-[70px] text-black">
      <div className="flex flex-col w-full h-full lg:flex-row">
        {isHomeAdmin ? (
          <>
            <div className="flex-1 border-r ">
              <Search />
            </div>
            <div className="flex-2 border-r ">
              <TypeDropdown />
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 border-r">
              <CheckIn />
            </div>
            <div className="flex-1 border-r ">
              <CheckOut />
            </div>
            <div className="flex-1 border-r ">
              <TypeDropdown />
            </div>
            <button
              onClick={(e) => handleClick(e)}
              type="submit"
              className="flex-1 border-r bg-blue-200 hover:bg-blue-400"
            >
              Cari
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default BookForm;
