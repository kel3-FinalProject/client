import { Menu } from "@headlessui/react";

const TypeDropdown = ({ rooms, handleSelect, filterValue }) => {
  const filteredKamar = filterValue
    ? rooms.filter((room) => room.Class === filterValue)
    : rooms;

  return (
    // <div className="w-full h-full bg-white relative">
    //   <label htmlFor="filterSelect"></label>
    //   <select
    //     id="filterSelect"
    //     value={filterValue}
    //     onChange={(event) => handleSelect(event.target.value)}
    //   >
    //     <option value="">Type</option>
    //     <option value="vip">VIP</option>
    //     <option value="regular">Regular</option>
    //   </select>
    //   <ul className="bg-white absolute w-full flex flex-col z-40">
    //     {Array.isArray(filteredKamar) &&
    //       filteredKamar.map((room) => <li key={room.id} className="border-b last-of-type:border-b-0 h-12 hover:bg-blue-400 hover:text-white w-full flex justify-center items-center cursor-pointer"></li>)}
    //   </ul>
    // </div>

    <Menu as="div" className="w-full h-full bg-white relative ">
      <label htmlFor="filterSelect"></label>
      <select
        id="filterSelect"
        value={filterValue}
        onChange={(event) => handleSelect(event.target.value)}
        className="w-full h-full bg-white relative "
      >
        <option value="">Type</option>
        <option value="vip">VIP</option>
        <option value="regular">Regular</option>
      </select>

      <Menu.Items
        as="ul"
        className="bg-white absolute w-full flex flex-col z-40"
      >
        {Array.isArray(filteredKamar) &&
          filteredKamar.map((room) => (
            <Menu.Item
              as="li"
              className="border-b last-of-type:border-b-0 h-12 hover:bg-blue-400 hover:text-white w-full flex justify-center items-center cursor-pointer"
              key={room.id}
            ></Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};

export default TypeDropdown;
