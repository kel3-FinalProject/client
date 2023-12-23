import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addKamar } from "../utils/network";

function TambahKamar() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/Home-Admin", { replace: true });
  };
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const [roomData, setRoomData] = useState({
    nameKamar: "",
    harga: "",
    size: "",
    kapasitas: "",
    Class: "VIP",
    description: "",
    fasilitas: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ekstrak nilai dari roomData
    const { nameKamar, harga, size, description, kapasitas, fasilitas, Class } = roomData;
      // Panggil fungsi addKamar dengan nilai yang diekstrak dan file
      const result = await addKamar(
        nameKamar,
        harga,
        size,
        description,
        kapasitas,
        fasilitas,
        Class,
        file
      );
      if (result.error) {
        alert("gagal menambahkan kamar");
      } else {
        navigate("/Home-Admin", {replace: true});
      }
  };
  

  return (
    <div className="bg-[#cecece] pt-5">
      <div className="bg-[#638ecb] max-w-4xl p-6 mx-auto rounded-md shadow-2xl">
        <h1 className="text-2xl font-bold text-white capitalize">
          Tambah Kamar
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="kamar" className="text-white">
                Nama Kamar
              </label>
              <input
                type="text"
                id="kamar"
                name="nameKamar"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.nameKamar}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="harga" className="text-white">
                Harga
              </label>
              <input
                type="text"
                id="harga"
                name="harga"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.harga}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="size" className="text-white">
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.size}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="kapasitas" className="text-white">
                Kapasitas
              </label>
              <input
                type="text"
                id="kapasitas"
                name="kapasitas"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.kapasitas}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="tipe" className="text-white">
                Type / Class Kamar
              </label>
              <select
                type="text"
                id="tipe"
                name="Class"
                value={roomData.Class}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            <div>
              <label htmlFor="deskripsi" className="text-white">
                Deskripsi
              </label>
              <textarea
                type="textarea"
                id="deskripsi"
                name="description"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label htmlFor="fasilitas" className="text-white">
                Fasilitas
              </label>
              <textarea
                type="textarea"
                id="fasilitas"
                name="fasilitas"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-gray-300 border border-gray-400 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                value={roomData.fasilitas}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label className="text-white">Gambar</label>
              <div className="flex mt-1 justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <img src={preview} />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex justify-center text-sm text-gray-200">
                    <label
                      htmlFor="gambar"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        id="gambar"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-2 text-white ">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex justify-start mt-6">
              <button
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-400 "
                onClick={goBack}
              >
                Back
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-400 "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahKamar;
