import React, { useContext, useEffect, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import Room from "../components/Room";
import { RoomContext } from '../pages/RoomContext';
import { IoChevronBack } from "react-icons/io5";

const Rooms = () => {
  const location = useLocation();
  const isOnAdminPage = location.pathname.startsWith("/Home-Admin");

  const { rooms, fetchData } = useContext(RoomContext);

  const fetchRoomsData = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRoomsData();
  }, [fetchRoomsData]);
  if (!rooms) {
 
    return <div>Loading...</div>;
  }
  console.log(rooms);

  return (
    <section className="py-24">
      <div className="container mx-auto lg:px-0">
        <div className="flex items-center mb-3">
          <Link to={isOnAdminPage ? "/Home-Admin" : "/Home"} className="mr-2">
            <IoChevronBack className="text-gray-500 hover:text-blue-400" />
          </Link>
          <strong className="text-gray-700 font-medium">Daftar Kamar</strong>
        </div>
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;

