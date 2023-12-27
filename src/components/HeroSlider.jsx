import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import gambar1 from '../assets/img/slider/KF-3.jpg';
import gambar2 from '../assets/img/slider/KF-4.jpg';
import gambar3 from '../assets/img/slider/KS-2.jpg';
import gambar4 from '../assets/img/slider/KS-3.jpg';
import gambar5 from '../assets/img/slider/KS-4.jpg';

const slides = [
  {
    title: 'Kamar mewah untuk liburan anda',
    bg: gambar1,
    btnText: 'Pilihlah kamar favorit anda',
  },
  {
    title: 'Kamar mewah untuk liburan anda',
    bg: gambar2,
    btnText: 'Pilihlah kamar favorit anda',
  },
  {
    title: 'Kamar mewah untuk liburan anda',
    bg: gambar3,
    btnText: 'Pilihlah kamar favorit anda',
  },
  {
    title: 'Kamar mewah untuk liburan anda',
    bg: gambar4,
    btnText: 'Pilihlah kamar favorit anda',
  },
  {
    title: 'Kamar mewah untuk liburan anda',
    bg: gambar5,
    btnText: 'Pilihlah kamar favorit anda',
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      className='heroSlider h-[700px] lg:h-[630px]'
      effect="fade"
      loop={true}
      autoplay={{ 
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide, index) => {
        const { title, bg, btnText } = slide;
        return (
          <SwiperSlide className='relative h-full relative flex justify-center items-center' key={index}>
            <div className='z-30 text-white text-center'>
              <div className='uppercase font-mono tracking-[6px] mb-5 text-[23px]'>Selamat bersantai dan bersenang-senang</div>
              <h1 className='text-[45px] font-serif uppercase tracking-[2px] max-w-[920] lg:text-[35px] leading-tight mb-6'>{title}</h1>
              <button className='btn btn-lg bg-blue-900 py-2 px-4 rounded mx-auto hover:bg-blue-500'>{btnText}</button>
            </div>
            <div className='absolute top-0 w-full h-full'>
              <img className='object-cover h-full w-full' 
              src={bg} alt='' />
            </div>
            <div className='absolute w-full h-full bg-black/50'></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
