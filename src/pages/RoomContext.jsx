import { createContext, useState } from 'react';
import { roomData } from '../components/Data';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(roomData);
  const [type, setType] = useState('Type');

  const handleDelete = (roomId) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.filter((room) => room.id !== roomId);
      return updatedRooms;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(type);

    const newRooms = roomData.filter((room) => {
      return type === 'Type' || type === room.type;
    });

    setRooms(newRooms);
  };

  return (
    <RoomContext.Provider value={{ rooms, type, setType, handleClick, handleDelete }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
