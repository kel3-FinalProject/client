import { createContext, useState, useEffect } from "react";
import { getKamar } from "../utils/network";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
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

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = { rooms, fetchData };
  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
