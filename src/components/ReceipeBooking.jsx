import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderReceipt = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleGoBack = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);

    if (confirmed) {
      window.location.href = `/Reservasi`;
    }
  };

  return (
    <div className="bg-white p-8 shadow-md max-w-md mx-auto mt-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Struk Pemesanan Dream Hotel</h1>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm">Nama Pelanggan:</p>
          <p className="font-bold">John Doe</p>
        </div>

        <div>
          <p className="text-sm">Tanggal Check In:</p>
          <p className="font-bold">12 Januari 2023</p>
        </div>

        <div>
          <p className="text-sm">Tanggal Check Out:</p>
          <p className="font-bold">12 Januari 2023</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm">Detail Pemesanan:</p>
        <ul>
          <li className="flex justify-between">
            <span>Nomor Reservasi</span>
            <span>1</span>
          </li>

          <li className="flex justify-between">
            <span>Nomor kamar</span>
            <span>2</span>
          </li>

          <li className="flex justify-between">
            <span>Tipe kamar</span>
            <span>Regular</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-4">
        <p className="text-sm">Total Pembayaran:</p>
        <p className="font-bold text-xl">Rp 500.000</p>
      </div>

      <Link to={`/Home/`}>
        <button className="bg-green-300 hover:bg-green-500 font-bold py-2 px-4 rounded text-black flex justify-center items-center w-full">
          Pembayaran
        </button>
      </Link>

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
