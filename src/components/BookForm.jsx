import { useContext } from "react";
import CheckIn from "./CheckIn";
import TypeDropdown from "./TypeDropdown";
import CheckOut from "./CheckOut";
import Search from "./Search";
import { RoomContext } from "../pages/RoomContext";
import { useLocation } from "react-router-dom";

const BookForm = ({ handleSearch, rooms, handleSelect, filterValue }) => {
  const location = useLocation();
  const isHomeAdmin = location.pathname === "/Home-Admin";
  const { handleClick } = useContext(RoomContext);
  return (
    <form className="min-h-fit w-full lg:h-[70px] text-black">
      {isHomeAdmin ? (
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex-1 border-r ">
            <Search handleSearch={handleSearch} />
          </div>
          <div className="flex-none border-r ">
            <TypeDropdown
              rooms={rooms}
              handleSelect={handleSelect}
              filterValue={filterValue}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full lg:flex-row">
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
        </div>
      )}
    </form>
  );
};

export default BookForm;
