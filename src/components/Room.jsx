import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs";
import { getKamarById } from "../utils/network";

const Room = ({ room }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomeAdmin = location.pathname === "/Home-Admin";
  const { id, nameKamar, image, size, kapasitas, description, } = room;

  const handleRoomDetail = async () => {
    try {
      const { error, data } = await getKamarById(id);
      console.log("Respon API:", data);

      if (!error && data !== null) {
        // console.log("Detail kamar:", data);
        console.log("Navigasi ke /room/", id);
        navigate(`/room/${id}`);
      } else {
        console.error(`Gagal mengambil detail kamar dengan id: ${id}. Kesalahan API:`, data);
      }
    } catch (error) {
      console.error("Kesalahan:", error);
    }
  };

  return (
    <div className="bg-white drop-shadow-xl min-h-[500px] group">
      <div className="overflow-hidden">
        <img
          className="group-hover:scale-110 transition-all duration-300 w-full"
          src={image}
          alt={nameKamar}
        />
      </div>
      <div className="bg-white text-black drop-shadow-xl max-w-[320px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
        <div className="flex justify-between w-[85%]">
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsArrowsFullscreen className="text-[14px]" />
            </div>

            <div className="flex gap-x-1 ">
              <div>Size</div>
              <div>{size}</div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsPeople className="text-[15px]" />
            </div>

            <div className="flex gap-x-1">
              <div>Max People</div>
              <div>{kapasitas}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="h3 text-black">{nameKamar}</h3>
        <p className="text-black max-w-[300px] mx-auto mb-3 lg:mb-6">
          {description}
        </p>
      </div>
      {isHomeAdmin ? (
        <div className="flex justify-center items-center space-x-4 max-w-[240px] mx-auto">
          <button
            // onClick={handleDelete}
            className="bg-red-300 hover:bg-red-500 font-bold py-2 px-4 rounded text-black flex justify-center items-center w-[120px]"
          >
            Delete
          </button>
          <Link
            to="/Add-Kamar"
            className="bg-emerald-300 hover:bg-emerald-500 font-bold py-2 px-4 rounded text-black flex justify-center items-center w-[120px]"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-4 max-w-[240px] mx-auto">
          <button
            onClick={handleRoomDetail}
            className="bg-blue-300 hover:bg-blue-500 font-bold py-2 px-2 rounded text-black flex justify-center items-center"
          >
            Detail dan Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Room;
