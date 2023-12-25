// RoomDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getKamarById } from '../utils/network'; // Import fungsi getKamarById

const RoomDetails = () => {
  const navigate = useNavigate();
  const [kamarById, setKamarById] = useState([]);
  const { id } = useParams();

  const fetchDataAsync = async () => {
    if (id) {
      try {
        const response = await getKamarById(id);
        if (!response.error && response.data) {
          setKamarById(response.data);
        } else {
          console.error(`Error fetching room data for ID ${id}`);
          // Tambahkan return agar komponen tidak terus di-render
          alert(`data dengan id ${id} tidak di temukan`);
          navigate("/Rooms");
          return;
        }
      } catch (error) {
        console.error(`Error: ${error.message || error}`);
        // Tambahkan return agar komponen tidak terus di-render
        return;
      }
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [id, setKamarById]);

  if (!kamarById) {
    return <div>Loaading...</div>;
  }

  const { nameKamar, description, fasilitas_array, harga, Class, urlImage } = kamarById;

  return (
    <div>
      <Header />
      <section className="bg-white">
        <div
          className="bg-cover bg-center h-[560px] relative flex justify-center items-center"
          style={{ backgroundImage: `url(${urlImage})` }}
        >
          <div className="absolute w-full h-full bg-black/50 "></div>
          <h1 className="text-6xl font-mono z-20">{nameKamar} Detail</h1>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row h-full py-24">
            <div className="w-full h-full lg:w-[60%] px-6 text-black">
              <h2 className="text-[45px]">{nameKamar}</h2>
              <p>{description}</p>
              <p className="mb-8">Harga yang ditawarkan: Rp{harga}.000/malam</p>
              <img className="mb-8" src={urlImage} alt={nameKamar} />

              <div className="mt-12">
                <h3 className="text-[30px] mb-3">Fasilitas Kamar</h3>
                <p className="mb-12">Beberapa kenyamanan dan pelayanan yang ditawarkan jika Anda memilih kamar ini:</p>
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {Array.isArray(fasilitas_array) && fasilitas_array.length > 0 ? (
                  fasilitas_array.map((fasilitasItem, index) => (
                  <div className="flex items-center gap-x-3 flex-1" key={index}>
                  <div className="text-3xl text-yellow-600">
                  <FaCheck />
                  </div>
                <div className="">{fasilitasItem}</div>
              </div>
              ))
             ) : (
              <div>Data fasilitas tidak valid.</div>
             )}
              </div>
            </div>
            </div>

            <div className="w-full h-full lg:w-[40%]">
              <div className=" bg-blue-400">
                <div className="py-4 px-6 mb-3">
                  <div className="flex flex-col space-y-4 mb-4"></div>
                  <h3 className="text-black pb-4">Silakan Booking</h3>
                  <div className="h-[60px]">
                    <CheckIn />
                  </div>
                  <div className="h-[60px]">
                    <CheckOut />
                  </div>
                  <div className="text-black h-[60px] bg-white text-center pt-3">Tipe kamar: {Class}</div>
                  <div>
                    <Link to={`/Receipe/${id}`}>
                      <button className="btn btn-lg bg-blue-300 w-full py-2 px-4 rounded mx-auto text-black">
                        Booking sekarang
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <h3 className="text-[30px] text-black">Peraturan Hotel</h3>
                <p className="mb-6 text-black">
                  Beberapa peraturan di dalam hotel yang perlu diketahui dan dipatuhi oleh semua pihak yang ada di dalam hotel
                </p>
                <ul className="flex flex-col gap-y-4">
                  {/* Peraturan hotel */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoomDetails;
