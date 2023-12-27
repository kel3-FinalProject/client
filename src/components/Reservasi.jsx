import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers";
import { IoSearch, IoChevronBack } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { getReservasi } from "../utils/network";

const Reservasi = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [recentReservasiData, setRecentReservasiData] = useState([]);
  const [originalReservasiData, setOriginalReservasiData] = useState([]);

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = originalReservasiData.filter(
      (reservasi) =>
        reservasi.user_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        reservasi.current_order_status.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setRecentReservasiData(filteredData);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setRecentReservasiData(originalReservasiData);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const isReservasiAdmin = location.pathname === "/Reservasi-Admin";

  useEffect(() => {
    const fetchReservasi = async () => {
      try {
        const response = await getReservasi();

        if (response && !response.error && response.data) {
          console.log("Response data:", response.data);
          // Memperbarui state dengan data reservasi yang diambil dari API
          setOriginalReservasiData(response.data);
          setRecentReservasiData(response.data);
        } else {
          console.error("Error fetching reservasi data");
        }
      } catch (error) {
        console.error(`Error: ${error.message || error}`);
      }
    };

    fetchReservasi();
  }, []);

  const handlePembayaran = (reservasi) => {
    try {
      // Navigasi ke halaman OrderReceipt tanpa melakukan pembayaran langsung
      navigate(`/Receipe/${reservasi.id}`, {
        state: {
          namaPelangganParam: localStorage.getItem('name'),
          startDateParam: reservasi.tanggal_checkin,
          endDateParam: reservasi.tanggal_checkout,
          idParam: reservasi.id,
          nameKamarParam: reservasi.kamarId,
          hargaKamarParam: reservasi.total,
        },
      });
    } catch (error) {
      console.error(`Error: ${error.message || error}`);
    }
  };


  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex items-center mb-3">
        <Link to={isReservasiAdmin ? "/Home-Admin" : "/home"} className="mr-2">
          <IoChevronBack className="text-gray-500 hover:text-blue-400" />
        </Link>
        <strong className="text-gray-700 font-medium">
          {isReservasiAdmin ? "Daftar Reservasi" : "Reservasi Saya"}
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
              <th>Nama Pelangan</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Total</th>
              <th>Status</th>
              {isReservasiAdmin && <th>Ubah</th>}
            </tr>
          </thead>
          <tbody className="text-center">
            {recentReservasiData.map((reservasi) => (
              <tr key={reservasi.id}>
                <td>
                    {reservasi.id}
                </td>
                <td>
                  <Link to={`/room/${reservasi.kamarId}`}>
                    {reservasi.kamarId}
                  </Link>
                </td>
                <td>
                    {localStorage.getItem("name")}
                </td>
                <td>
                  {format(new Date(reservasi.tanggal_checkin), "dd MMM yyyy")}
                </td>
                <td>
                  {format(new Date(reservasi.tanggal_checkout), "dd MMM yyyy")}
                </td>
                <td>{reservasi.total}</td>
                
                <td> {reservasi.status === "menunggu pembayaran" ? (
                  <button onClick={() => handlePembayaran(reservasi)} className="bg-green-300 hover:bg-green-500 font-bold py-2 px-4 rounded text-black flex justify-center items-center w-full">
                    Pembayaran
                  </button>
                ) : (
                  <button className="bg-gray-300 cursor-not-allowed font-bold py-2 px-4 rounded text-black flex justify-center items-center w-full" disabled>
                    {getOrderStatus(reservasi.status)}
                  </button>
                )} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservasi;
