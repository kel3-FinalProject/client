// Rooms.jsx
import { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RoomContext } from '../pages/RoomContext';
import Room from '../components/Room';
import { IoChevronBack } from 'react-icons/io5';

const Rooms = () => {
  const { rooms, fetchData, deleteRoom } = useContext(RoomContext);
  const fetchRoomsData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchRoomsData();
  }, [fetchRoomsData]);

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      fetchRoomsData();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  if (!rooms) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto lg:px-0">
        <div className="flex items-center mb-3">
          <Link to="/home" className="mr-2">
            <IoChevronBack className="text-gray-500 hover:text-blue-400" />
          </Link>
          <strong className="text-gray-700 font-medium">Daftar Kamar</strong>
        </div>
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {rooms.map((room) => (
            <Room room={room} key={room.id} onDelete={() => handleDelete(room.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
