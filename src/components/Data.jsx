import Room1Img from '../assets/img/rooms/1.png';
import Room1ImgLg from '../assets/img/rooms/1-lg.png';
import Room2Img from '../assets/img/rooms/2.png';
import Room2ImgLg from '../assets/img/rooms/2-lg.png';
import Room3Img from '../assets/img/rooms/3.png';
import Room3ImgLg from '../assets/img/rooms/3-lg.png';

import {
    FaWifi,
    FaCoffee,
    FaBath,
    FaParking,
    FaSwimmingPool,
    FaHotdog,
    FaStopwatch,
    FaBed,
  } from 'react-icons/fa';
  
  export const roomData = [
    {
      id: 1,
      name: 'Family Room',
      description:
        'Kamar yang cocok untuk keluarga dengan kapasitas maksimal 4 orang yang dilengkapi dengan beberapa fasilitas untuk mendukung kenyamanan anda selama menginap di hotel',
      facilities: [
        { name: 'Wifi', icon: <FaWifi /> },
        { name: 'Coffee', icon: <FaCoffee /> },
        { name: 'Bath', icon: <FaBath /> },
        { name: 'Parking Space', icon: <FaParking /> },
        { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
        { name: 'Breakfast', icon: <FaHotdog /> },
        { name: 'GYM', icon: <FaStopwatch /> },
        { name: 'Double bed', icon: <FaBed /> },
      ],
      size: 70,
      maxPerson: 4,
      type: 'VIP',
      price: 200,
      image: Room1Img,
      imageLg: Room1ImgLg,
    },
    {
      id: 2,
      name: 'Family Room',
      description:
        'Kamar yang cocok untuk keluarga dengan kapasitas maksimal 4 orang yang dilengkapi dengan beberapa fasilitas untuk mendukung kenyamanan anda selama menginap di hotel',
      facilities: [
        { name: 'Wifi', icon: <FaWifi /> },
        { name: 'Coffee', icon: <FaCoffee /> },
        { name: 'Bath', icon: <FaBath /> },
        { name: 'Parking Space', icon: <FaParking /> },
        { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
        { name: 'Breakfast', icon: <FaHotdog /> },
        { name: 'GYM', icon: <FaStopwatch /> },
        { name: 'Double bed', icon: <FaBed /> },
      ],
      size: 70,
      maxPerson: 4,
      type: 'VIP',
      price: 200,
      image: Room2Img,
      imageLg: Room2ImgLg,
    },
    {
      id: 3,
      name: 'Single Room',
      description:
      'Kamar yang cocok untuk ditempati secara pribadi untuk menghabiskan waktu dengan kapasitas maksimal 2 orang yang dilengkapi dengan beberapa fasilitas untuk mendukung kenyamanan anda selama menginap di hotel',
      facilities: [
        { name: 'Wifi', icon: <FaWifi /> },
        { name: 'Coffee', icon: <FaCoffee /> },
        { name: 'Bath', icon: <FaBath /> },
        { name: 'Parking Space', icon: <FaParking /> },
        { name: 'Breakfast', icon: <FaHotdog /> },
        { name: 'Single bed', icon: <FaBed /> },
      ],
      size: 30,
      maxPerson: 2,
      type: 'Regular',
      price: 100,
      image: Room3Img,
      imageLg: Room3ImgLg,
    },
];