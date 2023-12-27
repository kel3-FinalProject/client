import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdCheck, MdClear } from "react-icons/md";
import CheckIn from "../components/CheckIn";
import CheckOut from "../components/CheckOut";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getKamarById } from "../utils/network";



const RoomDetails = () => {
  const navigation = useNavigate();

  const [kamarById, setKamarById] = useState(null);
  const { id } = useParams();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');

  const fetchDataAsync = async () => {
    if (id) {
      try {
        const response = await getKamarById(id);
        if (response && !response.error && response.data) {
          setKamarById(response.data);
        } else {
          console.error(`Error fetching room data for ID ${id}`);
          alert(`Data dengan ID ${id} tidak ditemukan`);
          navigation("/rooms");
        }
      } catch (error) {
        console.error(`Error: ${error.message || error}`);
      }
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [id, setKamarById]);

  if (!kamarById) {
    return <div>Loading...</div>;
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
              <p className="mb-8">Harga yang ditawarkan: Rp{harga}/malam</p>
              <img className="mb-8" src={urlImage} alt={nameKamar} />

              <div className="mt-12">
                <h3 className="text-[30px] mb-3">Fasilitas Kamar</h3>
                <p className="mb-12">
                  Beberapa kenyamanan dan pelayanan yang ditawarkan jika Anda
                  memilih kamar ini:
                </p>
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
                  <h3 className="text-black pb-4">Silahkan Booking</h3>

                  <div className="h-[60px]">
                    <div className='relative flex items-center justify-center h-full bg-white pt-1'>
                      <input className='w-full h-full bg-white pr-5 pl-5 mr-10 ml-10 text-center'  style={{ borderWidth: 0 }} placeholder="Nama Pelanggan" onChange={(e) => setNamaPelanggan(e.target.value)} />
                    </div>
                  </div>
                  <div className="h-[60px]">
                    <CheckIn startDate={startDate} setStartDate={setStartDate} />
                  </div>
                  <div className="h-[60px]">
                    <CheckOut endDate={endDate} setEndDate={setEndDate} />
                  </div>
                  <div className="text-black h-[60px] bg-white text-center pt-3">
                    Tipe kamar: {Class}
                  </div>
                  <div>
                    <button className="btn btn-lg bg-blue-300 w-full py-2 px-4 rounded mx-auto text-black"
                      onClick={() => navigation(`/Receipe/${id}`, {
                        state: {
                          idParam: id,
                          startDateParam: startDate,
                          endDateParam: endDate,
                          tipeKamarParam: Class,
                          nameKamarParam: nameKamar,
                          hargaKamarParam: harga,
                          namaPelangganParam: namaPelanggan
                        }
                      })}
                    >
                      Booking sekarang
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <h3 className="text-[30px] text-black">Peraturan Hotel</h3>
                <p className="mb-6 text-black">
                  Beberapa peraturan di dalam hotel yang perlu diketahui dan
                  dipatuhi oleh semua pihak yang ada di dalam hotel
                </p>
                <ul className="flex flex-col gap-y-4">
                  <li className="flex items-center gap-x-4 text-black">
                    <MdCheck size="1.7em" className="text-blue-800" />
                    Check-in: 07.00-22.00
                  </li>

                  <li className="flex items-center gap-x-4 text-black">
                    <MdCheck size="1.7em" className="text-blue-800" />
                    Check-in: 22.00
                  </li>

                  <li className="flex items-center gap-x-4 text-black">
                    <MdClear size="1.7em" className="text-red-500 " />
                    Alkohol
                  </li>
                  <li className="flex items-center gap-x-4 text-black">
                    <MdClear size="1.7em" className="text-red-500 " />
                    Merokok
                  </li>
                  <li className="flex items-center gap-x-4 text-black">
                    <MdClear size="1.7em" className="text-red-500" />
                    Hewan Peliharaan
                  </li>
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
