import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import TypeDropdown from '../components/TypeDropdown';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RoomContext } from './RoomContext';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";

import kamar2 from '../assets/img/gambar1.jpg';

const RoomDetails = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const room = rooms.find((room) => {
    return room.id === Number(id);
  });

  const { name, description, facilities, imageLg, price} = room;

  return (
    <div>
      <Header />
      <section className='bg-white'>
        <div
          className='bg-cover bg-center h-[560px] relative flex justify-center items-center'
          style={{ backgroundImage: `url(${kamar2})` }}
        >
          <div className='absolute w-full h-full bg-black/50 '></div>
          <h1 className='text-6xl font-mono z-20'>{name} Details</h1>
        </div>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row h-full py-24'>
            <div className='w-full h-full lg:w-[60%] px-6 text-black'>
              <h2 className='text-[45px]'>{name}</h2>
              <p className='mb-8'>{description}</p>
              <img className='mb-8' src={imageLg} alt=''/>

              <div className='mt-12'>
                <h3 className='text-[30px] mb-3'>Fasilitas Kamar</h3>
                <p className='mb-12'>
                  Beberapa kenyamanan dan pelayanan yang ditawarkan jika anda memilih kamar ini:
                </p>
                <div className='grid grid-cols-3 gap-6 mb-12'>
                  {facilities.map((item, index)=>{
                    const {name, icon}= item;
                    return (
                      <div className='flex items-center gap-x-3 flex-1' key={index}>
                        <div className='text-3xl text-yellow-600'>{icon}</div>
                        <div className=''>{name}</div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='w-full h-full lg:w-[40%]' >
              <div className=' bg-blue-400'>
                <div className='py-4 px-6 mb-3'>
                  <div className='flex flex-col space-y-4 mb-4'></div>
                  <h3 className='text-black pb-4'>Silahkan Booking</h3>
                  <div className='h-[60px]'><CheckIn /></div>
                  <div className='h-[60px]'><CheckOut /></div>
                  <div className='text-black h-[60px]'><TypeDropdown /></div>
                  <div>
                    <button className='btn btn-lg bg-blue-300 w-full py-2 px-4 rounded mx-auto text-black'>Booking sekarang Rp.{price}.000</button>
                  </div>
                </div>
              </div>
              
              <div className='pt-3'>
                <h3 className='text-[30px] text-black'>Peraturan Hotel</h3>
                <p className='mb-6 text-black'>Beberapa peraturan didalam hotel yang perlu diketahui dan dipatuhi oleh seluruh pihak yang ada di dalam hotel</p>
                <ul className='flex flex-col gap-y-4' >
                  <li className='flex items-center gap-x-4 text-black'>
                    <FaCheck className='text-blue-800'/>
                    Check-in : 07.00-22.00
                  </li>

                  <li className='flex items-center gap-x-4 text-black'>
                    <FaCheck className='text-blue-800'/>
                    Check-in : 22-00
                  </li>

                  <li className='flex items-center gap-x-4 text-black'>
                    <FaXmark className='text-red-500'/>
                    Alkohol
                  </li> 
                  <li className='flex items-center gap-x-4 text-black'>
                    <FaXmark className='text-red-500'/>
                    Merokok
                  </li> 
                  <li className='flex items-center gap-x-4 text-black'>
                    <FaXmark className='text-red-500'/>
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
