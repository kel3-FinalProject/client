import { useContext } from 'react';
import { RoomContext } from '../pages/RoomContext';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const list = [
  { name: 'Type' },
  { name: 'VIP' },
  { name: 'Regular' },
];

const TypeDropdown = () => {
  const { type, setType } = useContext(RoomContext);

  return (
    <Menu as='div' className='w-full h-full bg-white relative '>
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        {type}
        <BsChevronDown className='hover:text-blue-400' />
      </Menu.Button>

      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
        {list.map((li, index) => (
          <Menu.Item
            onClick={() => setType(li.name)}
            as='li'
            className='border-b last-of-type:border-b-0 h-12 hover:bg-blue-400 hover:text-white w-full flex justify-center items-center cursor-pointer'
            key={index}
          >
            {li.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default TypeDropdown;
