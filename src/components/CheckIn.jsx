import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css'
import { BsCalendar } from 'react-icons/bs';

const CheckIn = ({startDate, setStartDate}) => {

  return (
    <div className='relative flex items-center justify-center h-full bg-white'>
      <DatePicker
        className='w-full h-full bg-white' 
        selected={startDate}
        placeholderText='Check in'
        onChange={(date) => setStartDate(date)}
      />
      <div className='text-sky-800 pr-5'> 
        <BsCalendar />
      </div>
    </div>
  );
};

export default CheckIn;
