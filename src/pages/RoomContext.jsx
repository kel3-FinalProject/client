// RoomContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getKamar } from '../utils/network';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  const [type, setType] = useState('Type');

  const handleDelete = (roomId) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.filter((room) => room.id !== roomId);
      return updatedRooms;
    });
  };

  const fetchData = async () => {
    try {
      const response = await getKamar();
      if (!response.error && Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        console.error("Invalid response data structure:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };  

  const handleClick = (e) => {
    e.preventDefault();
    console.log(type);

    // Jika type adalah 'Type', kembalikan semua kamar
    const newRooms = type === 'Type' ? rooms : rooms.filter((room) => type === room.type);

    setRooms(newRooms);
  };

  const contextValue = { rooms, type, setType, handleClick, handleDelete, fetchData };

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
