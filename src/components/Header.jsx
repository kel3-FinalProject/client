import { useState, useEffect } from 'react';
import Logo from '../assets/img/logo/logo.png';

const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <header
      className={`${
        header ? 'bg-gray-300 py-3 shadow-lg' : 'bg-transparent py-6'
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className='container mx-auto flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between lg:gap-y-0'>
        <a href='/'>
          {<img className='w-[160px]' src={Logo} alt='Logo' />}
        </a>
        <nav className={`${header ? 'text-black' : 'text-white'} flex gap-x-3 font-tertiary tracking-[3px] text-[14px] items-center uppercase lg:gap-6`}>
          <a href='' className='hover:text-teal-700 transition'>
            Home
          </a>
          <a href='' className='hover:text-teal-700 transition'>
            Kamar
          </a>
          <a href='' className='hover:text-teal-700 transition'>
            Reservasi
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
