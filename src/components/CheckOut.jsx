import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckOut = ({endDate, setEndDate}) => {

  return (
    <div className='relative flex items-center justify-center h-full bg-white'>
      <DatePicker
        className='w-full h-full bg-white' 
        selected={endDate}
        placeholderText='Check out'
        onChange={(date) => setEndDate(date)}
      />
      <div className='text-sky-800 pr-5'> 
        <BsCalendar />
      </div>
    </div>
  );
};

export default CheckOut;
