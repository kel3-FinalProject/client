import {useContext} from 'react';
import CheckIn from './CheckIn';
import TypeDropdown from './TypeDropdown';
import CheckOut from './CheckOut';
import { RoomContext } from '../pages/RoomContext';

const BookForm = () => {
  const {handleClick} = useContext(RoomContext);
  return <form className='h-[300px] w-full lg:h-[70px] text-black'>
    <div className='flex flex-col w-full h-full lg:flex-row'>
       <div className='flex-1 border-r'>
            <CheckIn />
        </div> 

        <div className='flex-1 border-r '>
            <CheckOut />
        </div> 

        <div className='flex-1 border-r '>
            <TypeDropdown />
        </div> 

        <button onClick={(e)=> handleClick(e)}
          type='submit' 
          className='flex-1 border-r bg-blue-200 hover:bg-blue-400'>Reservasi</button>
    </div>
  </form>;
};

export default BookForm;
