import Header from "../components/Header";
import Footer from "../components/Footer";
import Rooms from "../components/Rooms";
import BookForm from "../components/BookForm";
import HeroSlider from "../components/HeroSlider";
import { useState, useContext, useEffect, useCallback } from "react";
import { RoomContext } from "./RoomContext";

const HomeAdmin = () => {
  const { rooms, fetchData } = useContext(RoomContext);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const fetchRoomsData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchRoomsData();
  }, [fetchRoomsData]);

  return (
    <div>
      <Header />
      <HeroSlider />
      <div className="container mx-auto relative">
        <div className="bg-blue-900/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
          <BookForm
            handleSearch={setSearch}
            rooms={
              Array.isArray(rooms) &&
              rooms.filter((room) => room.Class?.toLowerCase())
            }
            filterValue={filterValue}
            handleSelect={setFilterValue}
          />
        </div>
      </div>
      <Rooms
        rooms={
          Array.isArray(rooms) &&
          rooms.filter((room) =>
            room.Class?.toLowerCase().includes(search || filterValue)
          )
        }
      />
      <Footer />
    </div>
  );
};

export default HomeAdmin;
