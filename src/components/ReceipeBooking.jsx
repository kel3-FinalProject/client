import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { bayarReservasi } from '../utils/network';


const OrderReceipt = ({ roomDetails }) => {
  const dataParams = useLocation();
  const navigation = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderData, setOrderData] = useState({
    namePelanggan: '',
    tanggal_checkin: '',
    tanggal_checkout: '',
    id: '',
    name: '',
    Class: '',
    total: 0,
  });
  const [bayar, setBayar] = useState([]);

  useEffect(() => {
    console.log('Data Params saat ini:', dataParams);

    const initialData = {
      namePelanggan: dataParams.state?.namaPelangganParam || '', // Menggunakan data langsung dari state
      name: dataParams.state?.nameKamarParam || '',
      tanggal_checkin: moment(dataParams.state?.startDateParam).format('DD MMMM YYYY'),
      tanggal_checkout: moment(dataParams.state?.endDateParam).format('DD MMMM YYYY'),
      id: dataParams.state?.idParam || '',
      id_kamar: dataParams.state?.idParam || '',
      Class: dataParams.state?.tipeKamarParam || '',
      total: dataParams.state?.hargaKamarParam || 0,
    };

    setOrderData(initialData);
  }, [dataParams]);


  const handleGoBack = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      window.location.href = '/Reservasi';
    }
  };

  const handlePembayaran = async (e) => {
    e.preventDefault();
    try {
      const response = await bayarReservasi(orderData.id);
  
      if (response && !response.error && response.data) {
        console.log("Response data:", response.data);
        setBayar(response.data);
        navigation("/Home");
      } else {
        console.error(`Error fetching room data for ID ${id}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message || error}`);
    }
  };
  

  return (
    <div className="bg-white p-8 shadow-md max-w-md mx-auto mt-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Struk Pemesanan Dream Hotel</h1>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm">Nama Pelanggan:</p>
          <p className="font-bold">{orderData.namePelanggan}</p>
        </div>

        <div>
          <p className="text-sm">Tanggal Check In:</p>
          <p className="font-bold">{orderData.tanggal_checkin}</p>
        </div>

        <div>
          <p className="text-sm">Tanggal Check Out:</p>
          <p className="font-bold">{orderData.tanggal_checkout}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm">Detail Pemesanan:</p>
        <ul>
          <li className="flex justify-between">
            <span>Nomor Reservasi</span>
            <span>{orderData.id}{orderData.name}</span>
          </li>

          <li className="flex justify-between">
            <span>Nomor kamar</span>
            <span>{orderData.name}</span>
          </li>

          <li className="flex justify-between">
            <span>Tipe kamar</span>
            <span>{orderData.Class}</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-4">
        <p className="text-sm">Total Pembayaran:</p>
        <p className="font-bold text-xl">Rp.{orderData.total}</p>
      </div>

      
        <button onClick={handlePembayaran} className="bg-green-300 hover:bg-green-500 font-bold py-2 px-4 rounded text-black flex justify-center items-center w-full">
          Pembayaran
        </button>

      <button
        onClick={handleGoBack}
        className="bg-red-300 hover:bg-red-500 font-bold py-2 px-4 mt-3 rounded text-black flex justify-center items-center w-full"
      >
        Kembali
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md text-center">
            <p className="mb-4">Apakah anda yakin tidak akan menyelesaikan proses pembayaran?</p>
            <button
              onClick={() => handleConfirmation(false)}
              className="bg-red-300 hover:bg-red-500 font-bold py-1 px-2 rounded text-black mr-2"
            >
              Tidak
            </button>
            <button
              onClick={() => handleConfirmation(true)}
              className="bg-green-300 hover:bg-green-500 font-bold py-1 px-2 rounded text-black"
            >
              Iya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderReceipt;
