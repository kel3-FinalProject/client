import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers";
import { IoSearch, IoChevronBack } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

const Reservasi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentReservasiData, setRecentReservasiData] = useState([]);
  const [originalReservasiData, setOriginalReservasiData] = useState([]);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = originalReservasiData.filter(
      (reservasi) =>
        reservasi.user_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        reservasi.current_order_status
          .toLowerCase()
          .includes(lowerCaseSearchTerm)
    );
    setRecentReservasiData(filteredData);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setRecentReservasiData(originalReservasiData);
  };

  const location = useLocation();
  const isReservasiAdmin = location.pathname === "/Reservasi-Admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Receipe');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecentReservasiData(data);
        setOriginalReservasiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isReservasiAdmin ? (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <div className="flex items-center mb-3">
            <Link to="/Home-Admin" className="mr-2">
              <IoChevronBack className="text-gray-500 hover:text-blue-400" />
            </Link>
            <strong className="text-gray-700 font-medium">
              Daftar Reservasi
            </strong>
          </div>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <div className="flex items-center mb-3">
              <div className="flex items-center border border-gray-300 rounded-sm mr-2 text-black w-80">
                <IoSearch className="ml-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama user atau status"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-2 py-1 w-full focus:outline-none"
                />
                {searchTerm && (
                  <button onClick={handleClearSearch} className="ml-2">
                    <FaTimes className="text-gray-500" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-2 py-1 bg-blue-300 text-black rounded-sm"
              >
                Cari
              </button>
            </div>
            <table className="w-full mt-10 text-gray-700 table-auto">
              <thead>
                <tr>
                  <th>No. Reservasi</th>
                  <th>Id Kamar</th>
                  <th>Tipe Kamar</th>
                  <th>Nama Pelangan</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {recentReservasiData.map((reservasi) => (
                  <tr key={reservasi.id}>
                    <td>
                      <Link to={`/Reservasi/${reservasi.id}`}>
                        {reservasi.id}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/room/${reservasi.room_id}`}>
                        {reservasi.room_id}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/room/${reservasi.Class}`}>
                        {reservasi.type}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/user/${reservasi.user_id}`}>
                        {reservasi.user_name}
                      </Link>
                    </td>
                    <td>
                      {format(new Date(reservasi.checkIn), "dd MMM yyyy")}
                    </td>
                    <td>
                      {format(new Date(reservasi.checkOut), "dd MMM yyyy")}
                    </td>
                    <td>{reservasi.total}</td>
                    <td>{getOrderStatus(reservasi.current_order_status)}</td>
                    <td>
                      <button className="px-2 py-1 bg-blue-300 text-black rounded-md">
                        Ubah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <div className="flex items-center mb-3">
            <Link to="/home" className="mr-2">
              <IoChevronBack className="text-gray-500 hover:text-blue-400" />
            </Link>
            <strong className="text-gray-700 font-medium">
              Daftar Reservasi
            </strong>
          </div>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <div className="flex items-center mb-3">
              <div className="flex items-center border border-gray-300 rounded-sm mr-2 text-black w-80">
                <IoSearch className="ml-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama user atau status"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-2 py-1 w-full focus:outline-none"
                />
                {searchTerm && (
                  <button onClick={handleClearSearch} className="ml-2">
                    <FaTimes className="text-gray-500" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-2 py-1 bg-blue-300 text-black rounded-sm"
              >
                Cari
              </button>
            </div>
            <table className="w-full mt-10 text-gray-700 table-auto">
              <thead>
                <tr>
                  <th>No. Reservasi</th>
                  <th>Id Kamar</th>
                  <th>Tipe Kamar</th>
                  <th>Nama Pelangan</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {recentReservasiData.map((reservasi) => (
                  <tr key={reservasi.id}>
                    <td>
                      <Link to={`/reservasi/${reservasi.id}`}>
                        {reservasi.id}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/room/${reservasi.room_id}`}>
                        {reservasi.room_id}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/room/${reservasi.type}`}>
                        {reservasi.type}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/user/${reservasi.user_id}`}>
                        {reservasi.user_name}
                      </Link>
                    </td>
                    <td>
                      {format(new Date(reservasi.checkIn), "dd MMM yyyy")}
                    </td>
                    <td>
                      {format(new Date(reservasi.checkOut), "dd MMM yyyy")}
                    </td>
                    <td>{reservasi.total}</td>
                    <td>{getOrderStatus(reservasi.current_order_status)}</td>
                    {/* <td>
                    <button className="px-2 py-1 bg-blue-300 text-black rounded-md">
                      Ubah
                    </button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Reservasi;
