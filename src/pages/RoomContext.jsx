import React, { createContext, useState, useEffect } from 'react';
import { getKamar } from '../utils/network';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  const [type, setType] = useState('Type');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getKamar();
      if (!response.error && Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        setError(`Struktur data respons tidak valid: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      setError(`Kesalahan mengambil data: ${error.message || error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const newRooms = type === 'Type' ? rooms : rooms.filter((room) => type === room.type);
    setRooms(newRooms);
  };

  const contextValue = {
    rooms,
    type,
    setType,
    handleClick,
    fetchData,
    error,
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
