import { createContext, useState} from 'react';
import { getKamar, deleteKamar } from '../utils/network';

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

  const deleteRoom = async (roomId) => {
    try {
      await deleteKamar(roomId);
      console.log("Berhasil menghapus data dengan id:", roomId)
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const contextValue = { rooms, fetchData, deleteRoom };
  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
