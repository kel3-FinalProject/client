import Header from '../components/Header';
import Footer from '../components/Footer';
import Rooms from '../components/Rooms';
import BookForm from '../components/BookForm';
import HeroSlider from '../components/HeroSlider';
import { useContext, useEffect, useCallback } from "react";
import { RoomContext } from "./RoomContext";

const Home = () => {
  const { rooms, fetchData } = useContext(RoomContext);

  const fetchRoomsData = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRoomsData();
  }, [fetchRoomsData]);

  return (
    <div>
      <Header />
      <HeroSlider />
      <div className='container mx-auto relative'>
        <div className='bg-blue-900/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12'>
          <BookForm />
        </div>
      </div>
      <Rooms rooms={rooms}/>
      <Footer />
    </div>
  );
};

export default Home;
